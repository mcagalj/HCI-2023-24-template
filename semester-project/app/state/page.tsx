"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import { type } from "os";

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

type State = {
  firstName: string;
  lastName: string;
  students: StudentProps[];
  shouldHideStudents: boolean;
};

const StateDemo: FC = () => {
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    students: studentsConstArray,
    shouldHideStudents: false,
  });

  const handleToggleClick = () => {
    setState((state) => ({
      ...state,
      shouldHideStudents: !state.shouldHideStudents,
    }));
  };

  const handleAddStudentClick = () => {
    if (state.firstName === "" || state.lastName === "") return;

    const newStudent = {
      id: state.students.length + 1,
      name: state.firstName,
      lastName: state.lastName,
      imgSrc: `https://source.unsplash.com/500x500?couple-selfie&sig=${
        state.students.length + 1
      }`,
    };

    setState((state) => ({
      ...state,
      students: [...state.students, newStudent],
    }));
  };

  const [filterValue, setFilterValue] = useState("");
  const [showShowClearButton, setShowClearButton] = useState(false);
  const handleFilterChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    setFilterValue(value);
    if (value !== "") {
      setShowClearButton(true);
    } else {
      setShowClearButton(false);
    }
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setShowClearButton(false);
  };

  const students =
    filterValue == ""
      ? state.students
      : state.students.filter((student) => {
          return (
            student.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            student.lastName.toLowerCase().includes(filterValue.toLowerCase())
          );
        });

  return (
    <main className="py-8">
      <h1 className="text-center mt-5 mb-5 font-bold text-4xl underline">
        Welcome to state demo!
      </h1>
      {state.shouldHideStudents ? (
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
          onChange={(e) =>
            setState((state) => ({ ...state, firstName: e.target.value }))
          }
        />
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
          type="text"
          placeholder="Last name"
          onChange={(e) =>
            setState((state) => ({ ...state, lastName: e.target.value }))
          }
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
      <input
        value={filterValue}
        onChange={handleFilterChange}
        className="mx-auto block my-4 appearance-none bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 mt-4"
        type="text"
        placeholder="Filter input"
      />
      <button
        onClick={handleClearFilter}
        className={`mx-auto block rounded-md border-2 border-red-400 text-red-500 py-0.5 px-4 ${
          showShowClearButton ? "visible" : "invisible"
        }`}
      >
        Clear
      </button>
    </main>
  );
};

export default StateDemo;
