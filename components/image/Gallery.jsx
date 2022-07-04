import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader';
import Header from './Header';
import Modal from './Modal';
import { motion } from 'framer-motion';
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
} from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';
import { useAuth } from '../../context/AuthUserContext';
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
      const imagesRef = await collection(projectFirestore, 'images');
      const q = await query(imagesRef, orderBy('timestamp', 'desc'), limit(8));
      const res = await getDocs(q);

      const lastVisible = res.docs[res.docs.length - 1];
      setLastImageRef(lastVisible);
    })();
  }, []);

  const fetchImages = async () => {
    const imagesRef = collection(projectFirestore, 'images');

    if (lastImageRef) {
      const q = await query(
        imagesRef,
        orderBy('timestamp', 'desc'),
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
      console.log('here it is', documents);
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
    const deleteRef = doc(projectFirestore, 'images', id);
    await deleteDoc(deleteRef);
    const imagesRef = collection(projectFirestore, 'images');
    const q = query(
      imagesRef,
      orderBy('timestamp', 'desc'),
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
    const totQ = await query(imagesRef, orderBy('timestamp', 'desc'));
    const totRes = await getDocs(totQ);
    const totalDocs = totRes.docs.length;
    setTotal(totalDocs);
    // console.log(totalDocs);
    /**............GET TOTAL............. */
    console.log('documents', documents);
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

  const updateImagesData = (data, length) => {
    setImages(data);
    setTotal(length);
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
        <div className="p-8 pt-20 bg-[#F9FAFB] columns-1 lg:columns-4">
          {images.map((image) => (
            <motion.div
              layout
              whileHover={{ opacity: 1 }}
              onClick={() => setImageModal(image.url)}
              key={image.id}
              className="relative"
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className=" w-full h-full mb-4 duration-300 ease-in rounded-md cursor-pointer hover:scale-105"
                src={image.url}
              />
              {/* <figcaption className="mt-2">{image.user.name}</figcaption>
              <p className="mb-2 text-sm text-gray-500 line-clamp-2">
                {image.description}
              </p> */}
              {authUser && (
                <button
                  // className="absolute px-2 py-2 mb-4 rounded-lg shadow-none"
                  onClick={(e) => onDeleteIamge(e, image.id)}
                  style={{ position: 'absolute', left: 0, top: 0 }}
                >
                  Delete
                </button>
              )}
            </motion.div>
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
