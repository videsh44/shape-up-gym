import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader";
import Header from "./Header";
import Modal from "./Modal";
import { motion } from "framer-motion";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { projectFirestore } from "../../firebase/config";
import { useAuth } from "../../context/AuthUserContext";
// import useFirestore from "../../../hooks/useFirestore";

const Gallery = ({ imagesData, totalDocs }) => {
  const { authUser } = useAuth();
  // const { docs } = useFirestore("images");
  const [images, setImages] = useState(imagesData);
  const [lastImageRef, setLastImageRef] = useState();
  const [total, setTotal] = useState(totalDocs);
  const [totalItemsAfterDelete, setTotalItemsAfterDelete] = useState(8);

  useEffect(() => {
    (async () => {
      const imagesRef = await collection(projectFirestore, "images");
      const q = await query(imagesRef, orderBy("timestamp", "desc"), limit(8));
      const res = await getDocs(q);

      const lastVisible = res.docs[res.docs.length - 1];
      setLastImageRef(lastVisible);
    })();
  }, []);

  const fetchImages = async () => {
    const imagesRef = collection(projectFirestore, "images");

    if (lastImageRef) {
      const q = await query(
        imagesRef,
        orderBy("timestamp", "desc"),
        startAfter(lastImageRef),
        limit(8)
      );
      const res = await getDocs(q);
      let documents = [];
      res.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      const lastVisible = res.docs[res.docs.length - 1];
      setLastImageRef(lastVisible);
      console.log("here it is", documents);
      let final_images = [...images, ...documents];
      setTotalItemsAfterDelete(final_images.length);
      setImages(final_images);
    }

    // const q = await query(
    //   imagesRef,
    //   orderBy('timestamp', 'desc'),
    //   startAfter(lastImageRef),
    //   limit(8)
    // );
    // const res = await getDocs(q);
    // let documents = [];
    // res.forEach((doc) => {
    //   documents.push({ ...doc.data(), id: doc.id });
    // });
    // console.log('here it is', documents);
    // setImages([...images, ...documents]);
  };

  const onDeleteIamge = async (e, id) => {
    e.stopPropagation();
    const deleteRef = doc(projectFirestore, "images", id);
    await deleteDoc(deleteRef);
    const imagesRef = collection(projectFirestore, "images");
    const q = query(
      imagesRef,
      orderBy("timestamp", "desc"),
      limit(totalItemsAfterDelete)
    );
    const res = await getDocs(q);
    let documents = [];
    res.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    const lastVisible = res.docs[res.docs.length - 1];
    setLastImageRef(lastVisible);
    /**............GET TOTAL............. */
    const totQ = await query(imagesRef, orderBy("timestamp", "desc"));
    const totRes = await getDocs(totQ);
    const totalDocs = totRes.docs.length;
    setTotal(totalDocs);
    // console.log(totalDocs);
    /**............GET TOTAL............. */
    console.log("documents", documents);
    setImages(documents);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    //   let documents = [];
    //   querySnapshot.forEach((doc) => {
    //     documents.push({ ...doc.data(), id: doc.id });
    //     setImages(documents);
    //     setTotal(documents.length);
    //   });
    // });
    // setImages(docs);
  };

  const updateImagesData = async () => {
    const imagesRef = collection(projectFirestore, "images");
    const q = query(
      imagesRef,
      orderBy("timestamp", "desc"),
      limit(totalItemsAfterDelete)
    );
    const res = await getDocs(q);
    let documents = [];
    res.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    const lastVisible = res.docs[res.docs.length - 1];
    setLastImageRef(lastVisible);

    /**............GET TOTAL............. */
    const totQ = await query(imagesRef, orderBy("timestamp", "desc"));
    const totRes = await getDocs(totQ);
    const totalDocs = totRes.docs.length;
    setTotal(totalDocs);
    console.log("documents", documents);
    setImages(documents);
    // setTotal(length);
  };

  // const [images, setImages] = useState([]);
  const [imageModal, setImageModal] = useState(false);

  const closeModal = () => {
    setImageModal(false);
  };
  return (
    <>
      {authUser && <Header updateImagesData={updateImagesData} />}

      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={images.length < total ? true : false}
        // hasMore={true}
        loader={<Loader />}
      >
        <div className="w-full h-full p-8 pt-20 columns-4">
          {images.map((data) => (
            <div className="relative">
              <img className="w-full mb-4" src={data.url}></img>
              <div className="absolute -top-3 -right-3">
                {authUser && (
                  <button
                    onClick={(e) => onDeleteIamge(e, data.id)}
                    className="z-50 p-1 bg-white border-[1px] border-[#D0D5DD] rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {imageModal && (
        <Modal
          selectedImage={imageModal}
          setImageModal={setImageModal}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Gallery;
