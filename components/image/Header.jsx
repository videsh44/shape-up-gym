import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { projectFirestore, projectStorage } from '../../firebase/config';

const Header = ({ updateImagesData }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState('');
  const [progress, setProgress] = useState(0);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      console.log('coming here');
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
          const docRef = await addDoc(collection(projectFirestore, 'images'), {
            url,
            timestamp: serverTimestamp(),
          });
          setComplete(url);
        }
      );
      const imagesRef = collection(projectFirestore, 'images');
      const q = query(imagesRef, orderBy('timestamp', 'desc'), limit(10));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
          updateImagesData(documents, documents.length);
        });
      });

      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <div className="flex relative flex-col bg-[#F9FAFB] items-center justify-center w-full mx-auto text-center">
      <p className="absolute text-[100px] font-bold text-white top-[9rem]">
        IMAGE GALLERY
      </p>
      <img className="h-[35vw] w-full" src="/assets/imageBg.jpg" />
      <label className="absolute top-[21rem] flex flex-col items-center px-4 py-4 tracking-wide text-white uppercase border rounded-lg shadow-lg cursor-pointer w-52 text-blue border-[#D0D5DD] hover:bg-blue hover:text-black">
        <svg
          className="w-8 h-8 text-[#D0D5DD]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base text-[#D0D5DD] leading-normal">
          Upload new Image
        </span>
        <input onChange={handleChange} type="file" className="hidden" />
      </label>
      {/* {complete ? null : (
          <div className="w-full mt-4 h-[1rem] bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%`, background: "green" }}
            ></div>
          </div>
        )} */}
      {progress === 0 || progress === 100 ? null : (
        <div className="flex flex-col p-10 space-y-3">
          <div className="relative w-full bg-gray-200 rounded">
            <div
              style={{ width: `${progress}%` }}
              className="absolute top-0 h-4 rounded shim-green"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
