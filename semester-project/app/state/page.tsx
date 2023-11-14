"use client";
import React, { FC, useState } from "react";
import Image from "next/image";

interface StudentProps {
  id: number;
  name: string;
  lastName: string;
  imgSrc: string;
}

const studentsConstArray = [
  {
    id: 1,
    name: "Mate",
    lastName: "Matic",
    imgSrc: "https://unsplash.com/photos/MTZTGvDsHFY/download?force=true&w=500",
  },
  {
    id: 2,
    name: "Ana",
    lastName: "Jurić",
    imgSrc: "https://unsplash.com/photos/rDEOVtE7vOs/download?force=true&w=500",
  },
];

const Student: FC<StudentProps> = ({ name, lastName, imgSrc }) => {
  return (
    <li className="flex flex-row relative items-center bg-blue-200 mt-2 p-2 rounded-full">
      <section className="mr-5 w-24 mt-5 mb-5 flex-row justify-between flex items-center">
        <p className="text-lg text-brand-purple-800">{name}</p>
        <p className="text-lg text-brand-purple-800">{lastName}</p>
      </section>
      <div className="w-[65px] h-[65px] relative">
        <Image
          src={imgSrc}
          alt="profile image"
          fill={true}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </li>
  );
};

const StateDemo: FC = () => {
  const [shouldHideStudents, setShouldHideStudents] = useState(false);
  const [students, setStudents] = useState(studentsConstArray);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleToggleClick = () => {
    setShouldHideStudents(!shouldHideStudents);
  };

  const handleAddStudentClick = () => {
    const newStudent = {
      id: students.length + 1,
      name: firstName,
      lastName: lastName,
      imgSrc: `https://source.unsplash.com/300x300/?selfie&sig=${
        students.length + 1
      }`,
    };
    setStudents([...students, newStudent]);
  };

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      {shouldHideStudents ? (
        <p className="text-center">Sorry! Studenti spavajau 😴</p>
      ) : (
        <ul className="flex flex-col items-center justify-around">
          {students.map((el) => (
            <Student key={el.id} {...el} />
          ))}
        </ul>
      )}
      <section className="flex flex-col w-64 justify-center items-center my-0 mx-auto border-gray-500">
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <button
          onClick={handleAddStudentClick}
          className="my-5 cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </section>
      <button
        onClick={handleToggleClick}
        className="block mx-auto cursor-pointer bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Toggle
      </button>
    </main>
  );
};

export default StateDemo;
