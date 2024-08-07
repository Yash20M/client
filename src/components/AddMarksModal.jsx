import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const AddMarksModal = ({ studentId, onClose, onMarksAdded }) => {
  const [formData, setFormData] = useState({
    english: "",
    math: "",
    science: "",
  });
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post("http://localhost:3000/api/marks", {
        studentId,
        ...formData,
      });
      console.log(response);
      toast.success("Marks added successfully!");
      onClose();
      onMarksAdded();
    } catch (err) {
      toast.error(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {loading && <Loader />}
        <h2 className="text-2xl mb-4">Add Marks</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">English</label>
            <input
              type="number"
              name="english"
              value={formData.english}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Math</label>
            <input
              type="number"
              name="math"
              value={formData.math}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Science</label>
            <input
              type="number"
              name="science"
              value={formData.science}
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
              Add Marks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarksModal;
