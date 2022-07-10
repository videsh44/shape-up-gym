import Image from "next/image";

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
    <div id="skills" className="w-full p-2 lg:h-screen">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
        <p className="text-xl tracking-widest px-2 uppercase font-medium  text-[#5651e5]">
          Skills
        </p>
        <h2 className="px-2 py-4">What I Can Do</h2>
        <div className="grid items-center justify-center w-full gap-4 mt-8">
          <div className="grid flex-col w-full text-center lg:grid-cols-3 ">
            {list.map((item, i) => (
              <div
                key={i}
                className="w-[95%] bg-white mb-11 shadow-xl rounded-xl hover:scale-105 ease-in duration-300 border-[#EAECF0] border-[1px] p-4 mx-auto "
              >
                <Image
                  className="mx-auto mt-2 w-14 h-14"
                  width={50}
                  height={50}
                  src={item.image}
                  alt="shape up gym dumbel photo"
                />
                {/* <img
                  alt="altText"
                  className="mx-auto mt-2 w-14 h-14"
                  src={item.image}
                /> */}
                <h1 className="text-[20px] py-2 mt-4 font-[700] text-[#101828]">
                  {item.heading}
                </h1>
                <p
                  aria-hidden="true"
                  className="text-[#667085] py-2 text-[16px] font-[700]"
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
