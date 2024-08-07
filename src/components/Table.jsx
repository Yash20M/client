import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader"; 
import { Link } from "react-router-dom";
import AddMarksModal from "./AddMarksModal";
import UpdateModal from "./UpdateModal";
import ConfirmationModal from "./ConfirmationModal";

const Table = ({ refresh }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);


  const fetchStudents = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/all?page=${page}&limit=${limit}`
      );
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      toast.error("Failed to fetch students.");
    }
  };

  useEffect(() => {
    fetchStudents(currentPage, pageSize);
  }, [currentPage, pageSize, refresh]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openMarksModal = (studentId) => {
    setSelectedStudentId(studentId);
    setIsMarksModalOpen(true);
  };

  const closeMarksModal = () => {
    setSelectedStudentId(null);
    setIsMarksModalOpen(false);
  };

  const openUpdateModal = (studentId) => {
    setSelectedStudentId(studentId);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedStudentId(null);
    setIsUpdateModalOpen(false);
  };

  const openConfirmationModal = (studentId, studentName) => {
    setSelectedStudentId(studentId);
    setSelectedStudentName(studentName);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setSelectedStudentId(null);
    setSelectedStudentName('');
    setIsConfirmationModalOpen(false);
  };

  const handleMarksAdded = () => {
    fetchStudents(currentPage, pageSize);
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
    fetchStudents(currentPage, pageSize);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/delete/${selectedStudentId}`);
      toast.success("Student deleted successfully.");
      fetchStudents(currentPage, pageSize);
      closeConfirmationModal();
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 mb-4">Error: {error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Age</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Marks</th>
                  <th className="py-2">Update</th>
                  <th className="py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="border px-4 py-2">
                      <Link
                        to={`/student/${student._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {student.name}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">{student.age}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => openMarksModal(student._id)}
                        className={`px-4 py-2 border-b-2 text-green-500 font-bold rounded ${
                          student.marks && student.marks.length > 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={student.marks && student.marks.length > 0}
                      >
                        Add Marks
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => openUpdateModal(student._id)}
                        className="px-4 py-2 text-yellow-500 font-bold"
                      >
                        Update
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => openConfirmationModal(student._id, student.name)}
                        className="px-4 py-2 text-red-500 font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 items-center mt-4">
            <button
              onClick={() => handlePageChange(1)}
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </>
      )}

      {isMarksModalOpen && (
        <AddMarksModal
          studentId={selectedStudentId}
          onClose={closeMarksModal}
          onMarksAdded={handleMarksAdded}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateModal
          studentId={selectedStudentId}
          onClose={closeUpdateModal}
          onStudentUpdated={handleStudentUpdated}
        />
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          studentName={selectedStudentName}
          onClose={closeConfirmationModal}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Table;
