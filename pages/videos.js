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
import { projectFirestore } from '../firebase/config';
import LazyLoad from 'vanilla-lazyload';
import lazyloadConfig from '../lazy-load/config';

export default function Videos({ imagesData }) {
  const [showModal, setShowModal] = useState(false);
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
      <Head>
        <title>Shape Up Gym Videos</title>
        <meta name="description" content="Shape Up Gym video gallery" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <div
      // className={styles.container}
      >
        <div style={{ height: '400px', marginBottom: '50px' }}>
          {imagesState && (
            <video
              ref={videoPlayerRef}
              style={{ height: '400px' }}
              className="main-video-player lazy__item"
              width="100%"
              height={300}
              controls
            >
              <source src={selectedVideoToPlay?.url} type="video/mp4" />
              <source src={selectedVideoToPlay?.url} type="video/ogg" />
              Your browser does not support HTML video.
            </video>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            aria-label="upload"
            onClick={() => setShowModal(true)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Upload Videos</span>
          </button>
        </div>
        {/* <UploadFormVideo /> */}
        {imagesState && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {imagesState.map((item) => (
              <div
                style={{
                  position: 'relative',
                  width: '300px',
                  maxWidth: '300px',
                  boxShadow:
                    'rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px ',
                  margin: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => onVideoSelectClick(item)}
                key={item.id}
              >
                <button
                  aria-label="delete"
                  onClick={(e) => onDeleteIamge(e, item.id)}
                  style={{
                    position: 'absolute',
                    right: '-15px',
                    top: '-15px',
                    border: 0,
                    outline: 0,
                    background: 'transparent',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="30px"
                    height="30px"
                  >
                    <path
                      fill="#f37e98"
                      d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"
                    />
                    <path
                      fill="#f15b6c"
                      d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"
                    />
                    <path
                      fill="#1f212b"
                      d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"
                    />
                    <path
                      fill="#1f212b"
                      d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"
                    />
                    <path
                      fill="#1f212b"
                      d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"
                    />
                    <path
                      fill="#1f212b"
                      d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"
                    />
                  </svg>
                </button>
                {/* <video width="400" controls>
                  <source src={item.url} type="video/mp4" />
                  <source src={item.url} type="video/ogg" />
                  Your browser does not support HTML video.
                </video> */}
                <video
                  //   preload="none"
                  className="lazy__item"
                  style={{ height: '200px', objectFit: 'cover' }}
                  width={300}
                  src={`${item.url}#t=1`}
                ></video>
                <div style={{ padding: '10px' }}>
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
