import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import Modal from "../components/Modal";
import VideoUploadForm from "../components/VideoUploadForm";
import { projectFirestore } from "../firebase/config";
import { TrashIcon } from "@heroicons/react/solid";

export default function Videos({ imagesData }) {
  //   const { docs } = useFirestore('videos');
  const [showModal, setShowModal] = useState(false);
  const videoPlayerRef = useRef(null);
  const [imagesState, setImagesState] = useState(imagesData);
  const [selectedVideoToPlay, setSelectedVideoToPlay] = useState(
    imagesData && imagesData.length ? imagesData[0] : {}
  );

  //   useEffect(() => {
  //     if (docs) {
  //       setImagesState(docs);
  //     }
  //   }, [docs]);
  console.log(imagesData);
  //   console.log('docs', docs);

  const onDeleteIamge = async (e, id) => {
    e.stopPropagation();

    const deleteRef = doc(projectFirestore, "videos", id);
    await deleteDoc(deleteRef);
  };

  const onVideoSelectClick = (data) => {
    console.log(data);
    setSelectedVideoToPlay(data);
    videoPlayerRef.current?.load();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
      // className={styles.container}
      >
        <div className="w-full bg-white">
          <div className="flex items-center justify-end px-10 pb-8 mx-auto pt-[6rem]">
            <div
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-6 py-4 border-[#D0D5DD] font-bold text-white bg-[#161C2D] rounded-md cursor-pointer"
            >
              <svg
                className="w-4 h-4 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Upload Videos</span>
            </div>
          </div>
        </div>

        <div className="bg-black relative h-[37.5rem] mb-12">
          {imagesState && (
            <video
              ref={videoPlayerRef}
              className="main-video-player h-[37.5rem]"
              width="100%"
              height={300}
              controls
            >
              <source src={selectedVideoToPlay?.url} type="video/mp4" />
              <source src={selectedVideoToPlay?.url} type="video/ogg" />
              Your browser does not support HTML video.
            </video>
          )}
          {imagesState.map((item) => (
            <div className="absolute justify-center w-full p-4 pb-4 mx-auto bg-white shadow-sm ">
              <p className="font-bold text-[20px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                {item.title}
              </p>
              <p className="text-[15px] text-gray-500">
                <span className="pr-2"> Duration :</span>

                {item.duration
                  ? new Date(Math.floor(item.duration) * 1000)
                      .toISOString()
                      .substring(14, 19)
                  : null}
              </p>
            </div>
          ))}
        </div>

        {/* <UploadFormVideo /> */}
        {imagesState && (
          <div
            className="flex flex-wrap items-center justify-center w-full mt-28"
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   flexWrap: "wrap",
            // }}
          >
            {imagesState.map((item) => (
              <div
                className="relative w-full max-w-[300px] m-5 cursor-pointer"
                onClick={() => onVideoSelectClick(item)}
                key={item.id}
              >
                <div
                  className="absolute p-1 bg-white border-[1px] border-[#D0D5DD] rounded-full -right-3 -top-3"
                  onClick={(e) => onDeleteIamge(e, item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                {/* <video width="400" controls>
                  <source src={item.url} type="video/mp4" />
                  <source src={item.url} type="video/ogg" />
                  Your browser does not support HTML video.
                </video> */}
                <video
                  className="h-[14rem] object-cover"
                  width={300}
                  src={`${item.url}#t=1`}
                ></video>
                <div className="pt-2">
                  <div className="font-bold text-[20px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {item.title}
                  </div>
                  <div className="text-[15px] text-gray-500">
                    Duration :
                    {item.duration
                      ? new Date(Math.floor(item.duration) * 1000)
                          .toISOString()
                          .substring(14, 19)
                      : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          modalTitle="Upload Video"
          showModal={showModal}
          closeModal={closeModal}
        >
          <VideoUploadForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const imagesRef = collection(projectFirestore, "videos");
  const q = await query(imagesRef, orderBy("timestamp", "desc"), limit(10));
  const res = await getDocs(q);
  // const imagesRef = collection(projectFirestore, 'images');
  // const res = await getDocs(imagesRef);
  let documents = [];
  res.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      imagesData: JSON.parse(JSON.stringify(documents)),
    }, // will be passed to the page component as props
  };
}
