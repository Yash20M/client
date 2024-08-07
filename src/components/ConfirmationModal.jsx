import React from "react";

const ConfirmationModal = ({ studentName, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
        <p>
          Are you sure you want to delete the student{" "}
          <span className="font-semibold">{studentName}</span>?
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
