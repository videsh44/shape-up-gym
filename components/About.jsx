import React from 'react';
import Image from 'next/image';
import AboutImg from '../public/assets/gymPhoto.webp';

const About = () => {
  return (
    <div id="about" className="w-full md:h-screen p-2 flex items-center py-16">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl font-medium tracking-widest text-[#5651e5]">
            Stay Healthy
          </p>
          <h2 className="py-4">Setup Your Body With Workout</h2>

          <p className="py-2 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur, mollitia amet nihil! Separated they live in
            Bookmarksgrove right at the coast of the Semantics, a large language
            ocean. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur, mollitia amet nihil! Separated they live in
            Bookmarksgrove right at the coast of the Semantics, a large language
            ocean.
          </p>
          <p className="py-2 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur, mollitia amet nihil! Separated they live in
            Bookmarksgrove right at the coast of the Semantics, a large language
            ocean. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur, mollitia amet nihil! Separated they live in
            Bookmarksgrove right at the coast of the Semantics, a large language
            ocean.
          </p>
        </div>
        <div className="w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-2 hover:scale-105 ease-in duration-300">
          <Image
            src={AboutImg}
            className="rounded-xl"
            alt="shape up gym about us photo"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
