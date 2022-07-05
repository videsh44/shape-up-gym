import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import Modal from '../components/Modal';
import VideoUploadForm from '../components/VideoUploadForm';
import { auth, projectFirestore } from '../firebase/config';
import LazyLoad from 'vanilla-lazyload';
import lazyloadConfig from '../lazy-load/config';
import { useAuth } from '../context/AuthUserContext';
import LoginForm from '../components/LoginForm';

export default function Videos({ imagesData }) {
  const { authUser, loading, signOutFunc } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const videoPlayerRef = useRef(null);
  const [imagesState, setImagesState] = useState(imagesData);
  const [selectedVideoToPlay, setSelectedVideoToPlay] = useState(
    imagesData && imagesData.length ? imagesData[0] : {}
  );

  useEffect(() => {
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad(lazyloadConfig);
    }
    document.lazyLoadInstance.update();
  }, []);

  //   console.log(imagesData);

  const onDeleteIamge = async (e, id) => {
    e.stopPropagation();

    const deleteRef = doc(projectFirestore, 'videos', id);
    await deleteDoc(deleteRef);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onVideoSelectClick = (data) => {
    setSelectedVideoToPlay(data);
    videoPlayerRef.current?.load();
    scrollToTop();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Head>
        <title>Shape Up Gym Videos</title>
        <meta name="description" content="Shape Up Gym video gallery" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <div
      // className={styles.container}
      >
        {authUser ? (
          <div className="w-full bg-white ">
            <div className="flex items-center justify-end px-10 pb-8 mx-auto pt-[6rem]">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center  hover:scale-105 duration-100 ease-in  px-6 py-4 border-[#D0D5DD] font-bold text-white bg-[#161C2D] rounded-md cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-2 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Upload Videos</span>
              </button>

              <button
                aria-label="logout"
                onClick={() => signOutFunc(auth)}
                className="inline-flex items-center ml-4 hover:scale-105 duration-100 ease-in  px-6 py-4 border-[#D0D5DD] font-bold text-white bg-[#161C2D] rounded-md cursor-pointer"
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="justify-end w-full pt-20 bg-white">
            <button
              aria-label="login"
              onClick={openLoginModal}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}
        <div className="bg-black  relative h-[37.5rem] mb-12">
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

          <div className="absolute justify-center w-full p-4 pb-4 mx-auto bg-white shadow-sm ">
            <p className="font-bold text-[20px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {selectedVideoToPlay.title}
            </p>
            <p className="text-[15px] text-gray-500">
              <span className="pr-2"> Duration :</span>

              {selectedVideoToPlay.duration
                ? new Date(Math.floor(selectedVideoToPlay.duration) * 1000)
                    .toISOString()
                    .substring(14, 19)
                : null}
            </p>
          </div>
        </div>

        {/* <UploadFormVideo /> */}
        {imagesState && (
          <div className="flex flex-wrap items-center justify-center mt-28">
            {imagesState.map((item) => (
              <div
                className="relative w-[300px] max-w-[300px] m-5 cursor-pointer"
                onClick={() => onVideoSelectClick(item)}
                key={item.id}
              >
                {authUser && (
                  <button
                    aria-label="delete"
                    onClick={(e) => onDeleteIamge(e, item.id)}
                    className="absolute z-50 p-1 hover:scale-105 duration-100 ease-in bg-white border-[1px] border-[#D0D5DD] rounded-full -right-3 -top-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5  w-5"
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
                {/* <video width="400" controls>
                  <source src={item.url} type="video/mp4" />
                  <source src={item.url} type="video/ogg" />
                  Your browser does not support HTML video.
                </video> */}
                <video
                  //   preload="none"
                  className="h-[14rem] object-cover"
                  width={300}
                  src={`${item.url}#t=1`}
                ></video>
                <div className="p-1">
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '20px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: '15px', color: 'lightgray' }}>
                    Duration :{' '}
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
      {showLoginModal && (
        <Modal
          modalTitle="Login"
          showModal={showLoginModal}
          closeModal={closeLoginModal}
        >
          <LoginForm closeModal={closeLoginModal} />
        </Modal>
      )}
    </>
  );
}

export async function getStaticProps(context) {
  const imagesRef = collection(projectFirestore, 'videos');
  const q = await query(imagesRef, orderBy('timestamp', 'desc'), limit(10));
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
