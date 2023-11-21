// ChartForm.js
import React, { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import axios from "axios";

const Display = () => {
  const [formData, setFormData] = useState({
    primaryColor: "",
    fontColor: "",
    fontSize: "",
    chatHeight: "",
    chatIconSize: "Medium",
    positionOnScreen: "Top",
    distanceFromBottom: "",
    horizontalDistance: "",
  });
  const [loading, setLoading] = useState(false); 
const getToken = localStorage.getItem("token");
console.log(getToken)

  const validateForm = () => {
    // Basic validation example
    return (
      formData.primaryColor &&
      formData.fontColor &&
      formData.fontSize &&
      formData.chatHeight &&
      formData.chatIconSize &&
      formData.positionOnScreen &&
      formData.distanceFromBottom &&
      formData.horizontalDistance
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill out all the fields.");
      return;
    }
    setLoading(true);
    try {
      // Assuming you have the token stored in localStorage
      // Send data to the API using Axios with the token in the header
      const response = await axios.post("http://localhost:8080/config/update", formData, {
        headers: {
          Authorization: `${getToken}`,
        },
      });

      // Handle the API response as needed
      console.log("API Response:", response.data);

      setFormData({
        primaryColor: "",
        fontColor: "",
        fontSize: "",
        chatHeight: "",
        chatIconSize: "Medium",
        positionOnScreen: "Top",
        distanceFromBottom: "",
        horizontalDistance: "",
      });

      // Optionally, you can perform additional actions after successful submission
    } catch (error) {
      // Handle errors from the API request
      console.error("API Error:", error.message);
      // You can also set state to show an error message to the user
    } finally {
        setLoading(false); // Set loading back to false, whether successful or not
      }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    // Call the callback function if provided
    if (onToggle) {
      onToggle(!isToggled);
    }
  };

  return (
    <div className="container mx-auto mt-8">
     
      <form onSubmit={handleSubmit} className=" bg-white  ">
        <div className=" flex justify-between">
          <div className="mb-4 w-2/5">
            <label
              htmlFor="primaryColor"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Primary Color
            </label>
            <input
              type="text"
              id="primaryColor"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className=" text-xs  text-smalltext">
              In publishing and graphic design, Lorem ipsum is a
            </p>
          </div>

          <div className="mb-4 w-2/5">
            <label
              htmlFor="fontColor"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Font Color
            </label>
            <input
              type="text"
              id="fontColor"
              name="fontColor"
              value={formData.fontColor}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className=" text-xs  text-smalltext">
              In publishing and graphic design, Lorem ipsum is a
            </p>
          </div>
        </div>

        <div className=" flex justify-between">
          <div className="mb-4 w-2/5">
            <label
              htmlFor="fontSize"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Font Size (in px)
            </label>
            <input
              type="text"
              id="fontSize"
              name="fontSize"
              value={formData.fontSize}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className=" text-xs  text-smalltext">
              In publishing and graphic design, Lorem ipsum is a
            </p>
          </div>

          <div className="mb-4 w-2/5">
            <label
              htmlFor="chatHeight"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Chart Height (in % of total screen)
            </label>
            <input
              type="text"
              id="chatHeight"
              name="chatHeight"
              value={formData.chatHeight}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className=" text-xs  text-smalltext">
              In publishing and graphic design, Lorem ipsum is a
            </p>
          </div>
        </div>

        <div className="flex justify-between pb-4 border-b">
          <div>
            <h1 className=" text-sm"> Show source</h1>
            <p className=" text-xs text-smalltext">selec toggle</p>
          </div>
          <button
            className={`${
              isToggled ? "bg-blue-500" : "bg-gray-300"
            } text-white px-3 py-1 text-sm rounded-full focus:outline-none`}
            onClick={handleToggle}
          >
            {isToggled ? "ON" : "OFF"}
          </button>
        </div>

        <p className=" text-primaryblue text-lg my-4">Chat Icon</p>

        <div className=" flex justify-between">
          <div className="mb-4 w-2/5 ">
            <label
              htmlFor="chatIconSize"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Chart Icon Size
            </label>
            <select
              id="chatIconSize"
              name="chatIconSize"
              value={formData.chatIconSize}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="mb-4 w-2/5">
            <label
              htmlFor="positionOnScreen"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Position on Screen
            </label>
            <select
              id="positionOnScreen"
              name="positionOnScreen"
              value={formData.positionOnScreen}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Right">Right</option>
              <option value="Left">Left</option>
            </select>
          </div>
        </div>

        <div className=" flex justify-between">
          <div className="mb-4 w-2/5 ">
            <label
              htmlFor="distanceFromBottom"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Distance from Bottom
            </label>
            <input
              type="text"
              id="distanceFromBottom"
              name="distanceFromBottom"
              value={formData.distanceFromBottom}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-2 w-2/5">
            <label
              htmlFor="horizontalDistance"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Horizontal Distance
            </label>
            <input
              type="text"
              id="horizontalDistance"
              name="horizontalDistance"
              value={formData.horizontalDistance}
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className=" flex">
          <div>
            <p className="text-sm font-bold">Bot Icon </p>
            <div className=" w-14 h-14 rounded-full bg-smalltext"></div>
          </div>
          <button className=" bg-primaryblue w-40 h-10  rounded-lg flex  mt-6 ml-8 py-1 px-5">
            <p className="text-sm font-bold text-white mt-1">Upload Image</p>
            <FileUploadOutlinedIcon style={{ color: "white" }} />
          </button>
        </div>
        <div className="mt-6">
        <button
            type="submit"
            className="bg-primaryblue hover:bg-blue-700 text-white font-bold mb-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Display;
