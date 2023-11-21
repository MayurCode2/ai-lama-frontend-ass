import React from "react";
import Sidebar from "../../components/Sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useSelector } from "react-redux";
import { useState } from "react";
import Display from "../../components/Display";
import axios from "axios";

function WidgestConfiguration() {
  // State for managing the active button and user data
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeButton, setActiveButton] = useState("general");
  const userData = JSON.parse(localStorage.getItem("user"));
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  // State for form data and errors
  const [formData, setFormData] = useState({
    chatboatName: "",
    wellcomeMessage: "",
    inputPlaceholder: "",
  });

  const [errors, setErrors] = useState({
    chatboatName: "",
    wellcomeMessage: "",
    inputPlaceholder: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error when the user starts typing
    }));
  };

  // Get user token from local storage
  const getToken = localStorage.getItem("token");
  console.log(getToken);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Basic validation
    const newErrors = {};
    if (!formData.chatboatName) {
      newErrors.chatboatName = "Chatbot Name is required";
    }
    if (!formData.wellcomeMessage) {
      newErrors.wellcomeMessage = "Welcome Message is required";
    }
    if (!formData.inputPlaceholder) {
      newErrors.inputPlaceholder = "Input Placeholder is required";
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, update the state and prevent submission
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Send data to the API using Axios
      const response = await axios.post(
        "https://ailama.onrender.com/config/update",
        formData,
        {
          headers: {
            Authorization: `${getToken}`,
          },
        }
      );

      // Handle the API response as needed
      console.log("API Response:", response.data);
      setSuccessMessage("Data sent successfully");

      // Optionally, you can perform additional actions after successful submission

      // Reset the form data after successful submission
      setFormData({
        chatboatName: "",
        wellcomeMessage: "",
        inputPlaceholder: "",
      });
    } catch (error) {
      // Handle errors from the API request
      console.error("API Error:", error.message);
      // You can also set state to show an error message to the user
    }
  };

  return (
    <div className="flex">
      {/* Sidebar Section */}
      <div className="md:w-1/4 lg:w-1/4">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="md:w-3/4 lg:w-3/4 ml-9">
        {/* Header Section */}
        <div className="flex justify-between mt-7">
          <div className="flex">
            <HomeOutlinedIcon />
            <p>/ {selectedProject.title} /</p>
            <p className="text-primaryblue ml-2">WidgestConfiguration</p>
          </div>
          <div className="flex mr-4">
            <div className="w-7 h-7 rounded-full mx-3 bg-lime-600"></div>
            <p>{userData.username}</p>
            <NotificationsOutlinedIcon className="h-8" />
          </div>
        </div>

        {/* Title Section */}
        <div className="flex justify-between mr-20 text-sm mt-3">
          <h1 className="text-primaryblue text-2xl font-bold">Configuration</h1>
        </div>

        {/* Button Navigation Section */}
        <div className="flex my-7 border-b pb-2">
          <button
            className={`text-md mr-7 ${
              activeButton === "general" ? "text-primaryblue" : ""
            }`}
            onClick={() => setActiveButton("general")}
          >
            General
          </button>
          <button
            className={`text-md mr-7 ${
              activeButton === "display" ? "text-primaryblue" : ""
            }`}
            onClick={() => setActiveButton("display")}
          >
            Display
          </button>
          <button className="text-md mr-7">Advanced</button>
        </div>

        {/* Form Section */}
        <div className="mr-9">
          {activeButton === "general" && (
            <div>
              <form onSubmit={handleSubmit}>
                {/* Chatbot Name */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="chatboatName"
                  >
                    Chatbot Name
                  </label>
                  <input
                    className={`w-full p-2 border rounded-md ${
                      errors.chatboatName ? "border-red-500" : ""
                    }`}
                    type="text"
                    id="chatboatName"
                    name="chatboatName"
                    value={formData.chatboatName}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-smalltext">
                    In publishing and graphic design, Lorem ipsum is a
                  </p>
                  {errors.chatboatName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.chatboatName}
                    </p>
                  )}
                </div>

                {/* Wellcome Message */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="wellcomeMessage"
                  >
                    Wellcome Message
                  </label>
                  <input
                    className={`w-full p-2 border rounded-md ${
                      errors.wellcomeMessage ? "border-red-500" : ""
                    }`}
                    type="text"
                    id="wellcomeMessage"
                    name="wellcomeMessage"
                    value={formData.wellcomeMessage}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-smalltext">
                    In publishing and graphic design, Lorem ipsum is a
                  </p>
                  {errors.wellcomeMessage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wellcomeMessage}
                    </p>
                  )}
                </div>

                {/* Input Placeholder */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="inputPlaceholder"
                  >
                    Input Placeholder
                  </label>
                  <input
                    className={`w-full p-2 border rounded-md ${
                      errors.wellcomeMessage ? "border-red-500" : ""
                    }`}
                    type="text"
                    id="inputPlaceholder"
                    name="inputPlaceholder"
                    value={formData.inputPlaceholder}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-smalltext">
                    In publishing and graphic design, Lorem ipsum is a
                  </p>
                  {errors.inputPlaceholder && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.inputPlaceholder}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                type="submit"
                disabled={loading} // Disable button during loading
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              {successMessage && (
                <p className="text-green-500 text-sm mt-1">{successMessage}</p>
                )}
              </form>
            </div>
          )}

          {/* Display Section */}
          {activeButton === "display" && (
            <div className="mr-8">
              <Display />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WidgestConfiguration;
