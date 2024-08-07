import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/student/${id}`
        );
        setStudent(response.data.student);
        setMarks(response.data.marks);
      } catch (err) {
        toast.error(err.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        Student not found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center mt-10">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-gray-600 active:bg-gray-700"
      >
        Back to Students List
      </button>
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-evenly items-center w-[60%]">
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2">Detials</h3>
          <p className="mb-2">
            <strong>Name:</strong> {student.name}
          </p>
          <p className="mb-2">
            <strong>Age:</strong> {student.age}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {student.email}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2">Marks</h3>
          <ul className=" list-inside list-none">
            {marks.map((mark) => (
              <li key={mark._id} className="mb-2">
                <p>
                  <strong>English:</strong> {mark.english}
                </p>
                <p>
                  <strong>Math:</strong> {mark.math}
                </p>
                <p>
                  <strong>Science:</strong> {mark.science}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
