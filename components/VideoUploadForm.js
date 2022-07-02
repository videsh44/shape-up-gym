import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { projectFirestore, projectStorage } from '../firebase/config';
import ErrorToast from './ErrorToast';

const VideoUploadForm = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [errorToastState, setErrorToastState] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    var reader = new FileReader();

    reader.onloadend = () => {
      let media = new Audio(reader.result);
      media.onloadedmetadata = function () {
        setVideoDuration(media.duration); // this would give duration of the video/audio file
      };
    };
    reader.readAsDataURL(selected);

    if (selected) {
      setFile(selected);
      // references
      const storageRef = ref(projectStorage, selected.name);
      const uploadTask = uploadBytesResumable(storageRef, selected);
      // const collectionRef = projectFirestore.collection('images');

      uploadTask.on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setImgUrl(url);
          // const docRef = await addDoc(collection(projectFirestore, 'videos'), {
          //   url,
          //   timestamp: serverTimestamp(),
          // });
        }
      );
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    if (!file) {
      let temp_error = {
        color: 'red',
        primaryText: 'Validation Error',
        secondaryText: '',
        description: 'Please Upload File',
      };
      setErrorToastState(temp_error);
      return;
    }
    if (error) {
      let temp_error = {
        color: 'red',
        primaryText: 'Validation Error',
        secondaryText: '',
        description: error,
      };
      setErrorToastState(temp_error);
      return;
    }

    if (!text) {
      let temp_error = {
        color: 'red',
        primaryText: 'Validation Error',
        secondaryText: '',
        description: 'Please Enter Title',
      };
      setErrorToastState(temp_error);
      return;
    }
    if (progress !== 100) {
      let temp_error = {
        color: 'red',
        primaryText: 'Uploading...',
        secondaryText: `${Math.ceil(progress)}% `,
        description: 'Please Wait for Upload to complete',
      };
      setErrorToastState(temp_error);
      return;
    }
    if (!imgUrl) {
      let temp_error = {
        color: 'yellow',
        primaryText: 'Uploading...',
        secondaryText: `${Math.ceil(progress)}% `,
        description: 'Please Wait for Almost Done',
      };
      setErrorToastState(temp_error);
      return;
    }

    const docRef = await addDoc(collection(projectFirestore, 'videos'), {
      url: imgUrl,
      title: text,
      duration: videoDuration,
      timestamp: serverTimestamp(),
    });
    closeModal();
    setErrorToastState(null);
  };

  const closeToastError = () => {
    setErrorToastState(null);
  };

  return (
    <>
      {/**................................................ */}
      {errorToastState && (
        <ErrorToast
          primaryText={errorToastState.primaryText}
          secondaryText={errorToastState.secondaryText}
          description={errorToastState.description}
          color={errorToastState.color}
          closeToastError={closeToastError}
        />
      )}

      {/**................................................ */}
      <div>
        <div className="md:grid md:grid-cols-1 md:gap-6">
          <div
            style={{ width: '350px' }}
            className="mt-5 md:mt-0 md:col-span-1"
          >
            {/* <form action="#" method="POST"> */}
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {' '}
                    Title{' '}
                  </label>
                  <div className="mt-1">
                    <textarea
                      onChange={onTextChange}
                      id="about"
                      name="about"
                      rows="3"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="enter your title here"
                    ></textarea>
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {' '}
                    Photo{' '}
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Change
                    </button>
                  </div>
                </div> */}

                <div>
                  {/* <label className="block text-sm font-medium text-gray-700">
                    {' '}
                    Cover photo{' '}
                  </label> */}
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a Video</span>
                          <input
                            onChange={handleChange}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="video/*"
                            className="sr-only"
                          />
                        </label>
                        {/* <p className="pl-1">or drag and drop</p> */}
                      </div>
                      {/* <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>

              {progress === 0 || progress === 100 ? null : (
                <div className="p-10 flex flex-col space-y-3">
                  <div className="relative w-full bg-gray-200 rounded">
                    <div
                      style={{ width: `${progress}%` }}
                      className="absolute top-0 h-4 rounded shim-green"
                    ></div>
                  </div>
                </div>
              )}

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  onClick={onSubmit}
                  //   type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoUploadForm;
