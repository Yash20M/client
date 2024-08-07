
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const UpdateModal = ({ studentId, onClose, onStudentUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/student/${studentId}`
        );
        setFormData(response.data.student);
      } catch (err) {
        toast.error(err.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/update/${studentId}`,
        formData
      );
      toast.success("Student updated successfully!");
      onStudentUpdated(response.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {loading && <Loader />}
        <h2 className="text-2xl mb-4">Update Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-red-600 active:bg-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-blue-600 active:bg-blue-700"
              disabled={loading}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
