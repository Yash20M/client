import React, { useState } from "react";
import CreateUserModal from "./CreateUser";
import Table from "./Table";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const handleStudentCreated = () => {
    setRefresh((prev) => !prev);
    closeModal();
  };

  return (
    <div className="w-full h-screen">
      <h1 className="text-3xl text-center mt-3">All Students</h1>

      <div className="w-full h-full p-5 overflow-hidden">
        <div className="w-full flex justify-end items-center ">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            Add New Student
          </button>
        </div>
        <Table refresh={refresh} />
      </div>

      {isModalOpen && (
        <CreateUserModal
          onClose={() => setIsModalOpen(false)}
          onStudentCreated={handleStudentCreated}
        />
      )}
    </div>
  );
};

export default Home;
