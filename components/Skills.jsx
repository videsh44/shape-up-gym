import React from "react";

const list = [
  {
    image: "/assets/dumbbell.png",
    heading: "Care about our team",
    title:
      "Understand what matters to our employees. Give them what they need to do their best work.",
  },
  {
    image: "/assets/dumbbell.png",
    heading: "Be excellent to each other",
    title:
      " No games. No bullshit. We rely on our peers to improve. Be open, honest and kind.",
  },
  {
    image: "/assets/dumbbell.png",
    heading: "Pride in what we do",
    title:
      "Value quality and integrity in everything we do. At all times. No exceptions",
  },
  {
    image: "/assets/dumbbell.png",
    heading: "Don't #!&$ the customer",
    title:
      "Understand customers' stated and unstated needs. Make them wildly successful. ",
  },
  {
    image: "/assets/dumbbell.png",
    heading: "Do the impossible",
    title:
      "Be energized by difficult problems. Revel in unknowns. Ask Why?, but always question, Why not? ",
  },
  {
    image: "/assets/dumbbell.png",
    heading: "Sweat the small stuff",
    title:
      "We believe the best products come from the best attention to detail. Sweat the small stuff.",
  },
];

const Skills = () => {
  return (
    <div id="skills" className="w-full lg:h-screen p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest px-2 uppercase font-medium  text-[#5651e5]">
          Skills
        </p>
        <h2 className="py-4 px-2">What I Can Do</h2>
        <div className="grid mt-8 gap-4 justify-center items-center w-full">
          <div className="grid w-full flex-col lg:grid-cols-3  text-center ">
            {list.map((item) => (
              <div className="w-[95%] mb-11 shadow-xl rounded-xl hover:scale-105 ease-in duration-300 border-[#EAECF0] border-[1px] p-4 mx-auto ">
                <img className="mx-auto mt-2 w-14 h-14" src={item.image} />
                <h1 className="text-[20px] py-2 mt-4 font-[700] text-[#101828]">
                  {item.heading}
                </h1>
                <p className="text-[#667085] py-2 text-[16px] font-[700]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          {/* <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image src={Css} width="64px" height="64px" alt="/" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>CSS</h3>
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image src={Javascript} width="64px" height="64px" alt="/" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>JavaScript</h3>
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image src={ReactImg} width="64px" height="64px" alt="/" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>React</h3>
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image src={Tailwind} width="64px" height="64px" alt="/" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Tailwind</h3>
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image src={Firebase} width="64px" height="64px" alt="/" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Firebase</h3>
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image src={Github} width="64px" height="64px" alt="/" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Github</h3>
              </div>
            </div>
          </div>
          <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-300">
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              <div className="m-auto">
                <Image src={NextJS} width="64px" height="64px" alt="/" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3>Next</h3>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Skills;
