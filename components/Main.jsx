import Link from 'next/link';

import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Main = () => {
  return (
    <div id="home" className="w-full  h-screen text-center">
      <div className="absolute md:bg-[transparent] opacity-90 bg-[url('/assets/cover2.jpeg')] bg-top bg-cover bg-no-repeat w-full justify-evenly flex h-full lg:h-full"></div>
      <div className="max-w-[1240px] relative w-full h-full mx-auto p-2 flex justify-center items-center">
        <div>
          <p className="uppercase text-sm tracking-widest font-medium text-white/80">
            LET&#39;S BUILD SOMETHING TOGETHER
          </p>
          <h1 className="py-2 pt-4 text-white/90">
            Fitness Help Me Feel Better
          </h1>
          <p className="py-4 text-gray-800 text-white/80 sm:max-w-[70%] m-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            nisi minus perspiciatis optio, id deserunt.
          </p>
          <div className="flex items-center justify-between max-w-[330px] m-auto py-4">
            <a
              aria-label="linkedin"
              href="https://www.linkedin.com/in/clint-briley-50056920a/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 bg-white/95 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <FaLinkedinIn />
              </div>
            </a>
            <a
              aria-label="github"
              href="https://github.com/fireclint"
              target="_blank"
              rel="noreferrer"
            >
              <div className="rounded-full shadow-lg shadow-gray-400 bg-white/95 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <FaGithub />
              </div>
            </a>
            <Link href="/#contact">
              <div className="rounded-full shadow-lg shadow-gray-400 bg-white/95  p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <AiOutlineMail />
              </div>
            </Link>
            <Link href="/resume">
              <div className="rounded-full shadow-lg shadow-gray-400 bg-white/95 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                <BsFillPersonLinesFill />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
