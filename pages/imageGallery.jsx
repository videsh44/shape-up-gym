import React from "react";
import Gallery from "../components/ImageGalleryComponent/Gallery";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const ImageGallery = ({ imagesData, totalDocs }) => {
  return (
    <>
      <Gallery imagesData={imagesData} totalDocs={totalDocs} />
    </>
  );
};

export default ImageGallery;

export async function getStaticProps(context) {
  const imagesRef = collection(projectFirestore, "images");
  /**............GET TOTAL............. */
  const totQ = await query(imagesRef, orderBy("timestamp", "desc"));
  const totRes = await getDocs(totQ);
  const totalDocs = totRes.docs.length;
  // console.log(totalDocs);
  /**............GET TOTAL............. */
  const q = await query(imagesRef, orderBy("timestamp", "desc"), limit(8));
  const res = await getDocs(q);
  let documents = [];
  res.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      imagesData: JSON.parse(JSON.stringify(documents)),
      totalDocs,
    }, // will be passed to the page component as props
    revalidate: 60,
  };
}
