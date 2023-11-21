import React from "react";
import Sidebar from "../../components/Sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

function Settings() {
  // State for managing the active button and user data

  const userData = JSON.parse(localStorage.getItem("user"));

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

            <p className="text-primaryblue ml-2">Account Settings</p>
          </div>
          <div className="flex mr-4">
            <div className="w-7 h-7 rounded-full mx-3 bg-lime-600"></div>
            <p className=" text-sm">user:{userData.username}</p>
            <NotificationsOutlinedIcon className="h-8" />
          </div>
        </div>

        {/* Title Section */}
        <div className="flex justify-between mr-20 text-sm mt-3">
          <h1 className="text-primaryblue text-2xl font-bold">Configuration</h1>
        </div>
        <div>
          <div className="flex mt-5">
            <div className=" w-24 h-24 bg-black rounded-full">
              <img
                src="https://images.unsplash.com/photo-1700336472296-a2b47e5222e2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="img"
                className=" object-cover w-full h-full rounded-full"
              />
            </div>
            <div className=" flex ml-7 ">
              <div className="mb-4 w-80">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  // onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 ml-10 w-80">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value="lamaai23@gmail.com"
                  // onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            <div></div>
          </div>

          <div className="mr-10">
            <h1 className=" text-primaryblue text-2xl font-bold">
              Subscriptions
            </h1>
            <div className="bg-primaryblue py-5 flex justify-between rounded mt-5 text-white">
              <p className="ml-7">
                You are currently on the Ques AI Basic Plan!
              </p>
              <button className="bg-white mr-3 px-5 py-1 rounded text-primaryblue">
                upgrade
              </button>
            </div>
            <p className=" text-primaryred underline mt-5">Cancel Subscription</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
