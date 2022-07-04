import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
// import { useRouter } from 'next/router';
import NavLogo from "../public/assets/logoGym.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [navBg, setNavBg] = useState("#ecf0f3");
  const [linkColor, setLinkColor] = useState("#1f2937");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-[4rem] shadow-xl z-[100] ease-in-out duration-300"
          : "fixed w-full h-[4rem] z-[100]"
      }
    >
      <div className="flex items-center justify-between w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <a className="uppercase font-bold  text-[35px]">Shape up</a>
          {/* <Image src={NavLogo} width="87" height="35" alt="/" /> */}
        </Link>
        <div>
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <li className="ml-10 text-sm font-medium uppercase ">
              <Link href="/">Home</Link>
            </li>

            <li className="ml-10 text-sm font-medium uppercase">
              <Link href="/#skills">Skills</Link>
            </li>
            <li className="ml-10 text-sm font-medium uppercase">
              <Link href="/#projects">Trainers</Link>
            </li>

            <li className="ml-10 text-sm font-medium uppercase">
              <Link href="/videos">Video Gallery</Link>
            </li>
            <li className="ml-10 text-sm font-medium uppercase">
              <Link href="/imageGallery">Image Gallery</Link>
            </li>
            <li className="ml-10 text-sm font-medium uppercase">
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
          {/* Hamburger Icon */}
          <div
            style={{ color: `${linkColor}` }}
            onClick={handleNav}
            className="cursor-pointer md:hidden"
          >
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        {/* Side Drawer Menu */}
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%]  sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex items-center justify-between w-full">
              <Link href="/">
                <a className="uppercase font-bold text-[30px]">Shape up</a>
              </Link>
              <div
                onClick={handleNav}
                className="p-3 rounded-full shadow-lg cursor-pointer shadow-gray-400"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="my-4 border-b border-gray-300">
              <p className="w-[85%] md:w-[90%] py-4">
                Let&#39;s build something legendary together
              </p>
            </div>
          </div>
          <div className="flex flex-col py-4">
            <ul className="uppercase">
              <Link href="/">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Home
                </li>
              </Link>

              <Link href="/#skills">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Skills
                </li>
              </Link>
              <Link href="/#projects">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Trainers
                </li>
              </Link>

              <Link href="/videos">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Video Gallery
                </li>
              </Link>
              <Link href="/imageGallery">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Image Gallery
                </li>
              </Link>
              <Link href="/#contact">
                <li onClick={() => setNav(false)} className="py-4 text-sm">
                  Contact
                </li>
              </Link>
            </ul>
            <div className="pt-28">
              <p className="uppercase tracking-widest text-[#5651e5]">
                Let&#39;s Connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <a
                  href="https://www.linkedin.com/in/clint-briley-50056920a/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="p-3 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105">
                    <FaLinkedinIn />
                  </div>
                </a>
                <a
                  href="https://github.com/fireclint"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="p-3 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105">
                    <FaGithub />
                  </div>
                </a>
                <Link href="/#contact">
                  <div
                    onClick={() => setNav(!nav)}
                    className="p-3 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105"
                  >
                    <AiOutlineMail />
                  </div>
                </Link>
                <Link href="/resume">
                  <div
                    onClick={() => setNav(!nav)}
                    className="p-3 duration-300 ease-in rounded-full shadow-lg cursor-pointer shadow-gray-400 hover:scale-105"
                  >
                    <BsFillPersonLinesFill />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
