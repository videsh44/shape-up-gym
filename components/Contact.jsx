import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import ContactImg from '../public/assets/contact.jpg';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    setName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div id="contact" className="w-full lg:h-screen">
      <div className="max-w-[1240px] m-auto px-2 py-16 w-full ">
        <p className="text-xl font-medium  tracking-widest uppercase text-[#5651e5]">
          Contact
        </p>
        <h2 className="py-4">Get In Touch</h2>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl p-1">
            <div className="lg:p-4 h-full ">
              <div>
                <Image
                  className="rounded-xl hover:scale-105 ease-in duration-300"
                  src={ContactImg}
                  alt="/"
                />
              </div>
              <div>
                <h2 className="py-2 uppercase">Manish Kumar</h2>
                <p className="uppercase font-medium">Gym Owner</p>
                <p className="py-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Natus laborum reprehenderit hic, laudantium ab praesentium,
                  quo, suscipit ad tempora animi non. Perferendis incidunt quos
                  iste veritatis aliquam? Labore, possimus ut? Natus laborum
                  reprehenderit hic, laudantium ab praesentium, quo, suscipit ad
                  tempora animi non. Perferendis incidunt quos iste veritatis
                  aliquam? Labore, possimus ut
                </p>
              </div>
              <div>
                <p className="uppercase  pt-6">Connect With Me</p>
                <div className="flex items-center  justify-between py-4">
                  <a
                    aria-label="linkedin"
                    href="https://www.linkedin.com/in/clint-briley-50056920a/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                      <FaLinkedinIn />
                    </div>
                  </a>
                  <a
                    aria-label="github"
                    href="https://github.com/fireclint"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                      <FaGithub />
                    </div>
                  </a>

                  <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                    <AiOutlineMail />
                  </div>
                  <Link href="/resume">
                    <a aria-label="contact">
                      <div className="rounded-full shadow-lg shadow-gray-400 p-6 cursor-pointer hover:scale-110 ease-in duration-300">
                        <BsFillPersonLinesFill />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4">
            <div className="p-4">
              <form
                onSubmit={handleSubmit}
                action="https://getform.io/f/08ebcd37-f5b5-45be-8c13-714f011ce060"
                method="POST"
              >
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="uppercase text-sm py-2">
                      Name
                    </label>
                    <input
                      id="name"
                      className="border-[2px] rounded-lg p-3 flex border-gray-300"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="uppercase text-sm py-2">
                      Phone Number
                    </label>
                    <input
                      className="border-[2px] rounded-lg p-3 flex border-gray-300"
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="email" className="uppercase text-sm py-2">
                    Email
                  </label>
                  <input
                    className="border-[2px] rounded-lg p-3 flex border-gray-300"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="subject" className="uppercase text-sm py-2">
                    Subject
                  </label>
                  <input
                    className="border-[2px]  rounded-lg p-3 flex border-gray-300"
                    type="text"
                    name="subject"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="message" className="uppercase text-sm py-2">
                    Message
                  </label>
                  <textarea
                    className="border-[2px]  rounded-lg p-3 border-gray-300"
                    rows="10"
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button className="w-full p-4 text-gray-100 mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <Link href="/">
            <a aria-label="go-top">
              <div className="rounded-full shadow-lg shadow-gray-400 p-4 cursor-pointer hover:scale-110 ease-in duration-300">
                <HiOutlineChevronDoubleUp
                  className="text-[#5651e5]"
                  size={30}
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
