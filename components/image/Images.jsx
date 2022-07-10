import React, { useState, useEffect } from "react";
import axios from "axios";

const images = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get(
        "https://api.unsplash.com/photos/random?client_id=9cUKmF10zR5nvb8EEdkLjD2j284E1fMXB8EHCXuUNOE&count=20"
      );
      setImage(res.data);
    };
    callApi();
  }, []);
  return (
    <>
      <div className="w-full h-full p-8 pt-40 columns-4">
        {image.map((data) => (
          <div className="relative">
            <img className="w-full mb-4" src={data.urls.regular}></img>
            <div className="absolute -top-3 -right-3">
              <button
                onClick={(e) => onDeleteIamge(e, image.id)}
                // style={{ position: "absolute", right: "-15px", top: "-15px" }}
                // className="absolute z-50 p-1  bg-white border-[1px] border-[#D0D5DD] rounded-full -right-3 -top-3"
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default images;
