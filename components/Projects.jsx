import Image from 'next/image';

const people = [
  {
    id: 1,
    image: '/assets/userEight.png',
    name: 'Manish Kumar',
    trainer: 'Trainer',
    title:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
  },
  {
    id: 2,
    image: '/assets/userFive.png',
    name: 'Manish Kumar',
    trainer: 'Trainer',
    title:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
  },
  {
    id: 3,
    image: '/assets/userNine.png',
    name: 'Manish Kumar',
    trainer: 'Trainer',
    title:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
  },
  {
    id: 4,
    image: '/assets/userTwo.png',
    name: 'Manish Kumar',
    trainer: 'Trainer',
    title:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.',
  },
];

const Projects = () => {
  return (
    <>
      <div id="projects" className="w-full">
        <div className="w-[50%] flex flex-col justify-center items-center text-center mx-auto px-2 py-16">
          <p className="text-xl font-medium  tracking-widest uppercase text-[#5651e5]">
            Trainer
          </p>
          <h2 className="py-4">Our Trainers</h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center mt-10 lg:mt-0 mx-auto w-[90%] h-full mb-10 justify-evenly">
        {people.map((item) => (
          <div
            key={item.id}
            className="items-center hover:scale-105 ease-in duration-300 mx-auto text-center"
          >
            <Image
              className="rounded-full"
              width={150}
              height={140}
              src={item.image}
              alt="shape up gym trainer"
            />
            <h1 className="text-[20px] font-medium pb-4 pt-4 text-center items-center">
              {item.name}
            </h1>
            <p className="text-[18px] pb-4 text-greyText text-center font-medium uppercase items-center">
              {item.trainer}
            </p>
            <p className="text-[16px] text-greyText px-9 pb-8 text-center items-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
