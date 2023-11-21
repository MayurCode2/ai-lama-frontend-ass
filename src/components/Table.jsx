// Table.js
import React from 'react';

const Table = ({ data, onEdit, onDelete }) => {
  function formatDateAndTime(rawDateTime) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(rawDateTime).toLocaleDateString(undefined, options);
  }
  return (
    <table className="min-w-full bg-white border  border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-left">Name</th>
          <th className="py-2 px-4 border-b text-left">Upload Date/Time</th>
          <th className="py-2 px-4 border-b text-left">Status</th>
          <th className="py-2 px-4 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>  
        {data.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-4 border-b text-left">{item.name}</td>
            <td className="py-2 px-4 border-b text-left">{formatDateAndTime(item.uploadDateTime)}</td>
            <td className="py-2 px-4 border-b text-left">done</td>
            <td className="py-2 px-4 border-b text-left">
              <button
                onClick={() => onEdit(item.id)}
                className=" text-btnblack border m-0 px-2 py-1 border-r-0 hover:text-blue-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-500 border px-2 py-1   hover:text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
