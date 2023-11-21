import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import spotify from "../../assets/spotify.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEpisode } from "../project/projectSlice";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link,useNavigate } from "react-router-dom";

function Upload() {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("user"));
const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  console.log(selectedProject._id);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setProjectName("");
    setProjectLink("");
    setIsFormValid(true);
    setErrorMessage("");
    setIsLoading(false); // Reset loading state
  };

  const handleCreateProject = async () => {
    try {
      setIsLoading(true); // Set loading to true when starting the project creation
      // Dispatch the createProject action with the project data
      const episodeData = {
        // Provide episode data here
        // For example:
        name: projectName,
        description: projectLink,
        // Add other episode properties as needed
      };
      console.log(episodeData);
      await dispatch(
        addEpisode({ projectId: selectedProject._id, episodeData })
      );
      // Close the modal and reset the form on successful creation
      closeModal();
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the project."
      );
    } finally {
      setIsLoading(false); // Set loading to false whether successful or not
    }
  };

  const validateForm = () => {
    if (projectName.trim() === "" || projectLink.trim() === "") {
      setIsFormValid(false);
      return false;
    }
    setIsFormValid(true);
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleCreateProject();
    }
    const data = {
      name: projectName,
      description: projectLink,
    };
  };
  console.log(projectName);
  console.log(projectLink);

  return (
    <div className="flex">
      <div className="md:w-1/4 lg:w-1/4">
        <Sidebar />
      </div>

      <div className="md:w-3/4  lg:w-3/4 ml-10">
        <div className="flex justify-between mt-7">
          <div className="flex">
            <HomeOutlinedIcon />
            <p>/ {selectedProject.title} /</p>
            <p className=" text-primaryblue">Upload</p>
            <button onClick={()=> navigate("/projects")} className=" border border-primaryblue text-primaryblue ml-2 px-1 text-xs rounded-md"
            >go back</button>
          </div>
          <div className="flex mr-4">
            <div className="w-7 h-7 rounded-full mx-3 bg-lime-600"></div>
            <p>{userData.username}</p>
            <NotificationsOutlinedIcon className="h-8" />
          </div>
        </div>
        <div className="flex justify-between mr-20 text-sm mt-3">
          <h1 className=" text-primaryblue text-2xl font-bold">Upload</h1>
          <Link to="/episodes" className=" text-white bg-primaryblue rounded-full px-2 py-2">Episodes</Link>
        </div>
        {/* grid card */}
        <div className="flex flex-wrap">
          <div
            className="flex border border-secondarybg rounded-xl p-2 px-7 mt-5 mr-14 cursor-pointer"
            onClick={openModal}
          >
            <div className="bg-primaryblue rounded-full  mr-3">
              <svg
                className=" w-14 h-14"
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="83"
                viewBox="0 0 84 83"
                fill="none"
              >
                <path
                  d="M42 82.7077C65.196 82.7077 84 64.1929 84 41.3538C84 18.5147 65.196 0 42 0C18.804 0 0 18.5147 0 41.3538C0 64.1929 18.804 82.7077 42 82.7077Z"
                  fill="#DA0000"
                />
                <path
                  d="M68.824 28.0839C68.5067 26.9074 67.8792 25.8344 67.005 24.9737C66.1308 24.113 65.0411 23.4951 63.8462 23.1827C59.5093 22.0554 42 22.0554 42 22.0554C42 22.0554 24.4844 22.0554 20.1164 23.2072C18.9273 23.5243 17.844 24.1443 16.9756 25.0047C16.1072 25.8651 15.4844 26.9356 15.1698 28.1084C14 32.3969 14 41.3784 14 41.3784C14 41.3784 14 50.3476 15.1698 54.6484C15.4844 55.8212 16.1072 56.8917 16.9756 57.7521C17.844 58.6125 18.9273 59.2325 20.1164 59.5496C24.472 60.7014 42 60.7014 42 60.7014C42 60.7014 59.5093 60.7014 63.8773 59.5496C65.0722 59.2372 66.1619 58.6193 67.0361 57.7586C67.9103 56.8978 68.5378 55.8249 68.8551 54.6484C70.0311 50.3598 70.0311 41.3784 70.0311 41.3784C70.0311 41.3784 70 32.3847 68.824 28.0839ZM36.4 49.6247V33.0831L50.9413 41.3539L36.4 49.6247Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex justify-center flex-col ">
              <p className="text-primaryblue font-bold ">Upload</p>
              <p className="text-md"> youtube Video</p>
            </div>
          </div>
          <div className="flex border border-secondarybg rounded-xl p-2 px-7 ml-7 mt-5 mr-12 cursor-pointer">
            <div className="bg-primaryblue rounded-full  mr-3">
              <svg
                className=" w-14 h-14"
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="84"
                viewBox="0 0 84 84"
                fill="none"
              >
                <path
                  d="M42 0C33.6932 0 25.5729 2.46326 18.6661 7.07828C11.7592 11.6933 6.37596 18.2528 3.19708 25.9273C0.018198 33.6018 -0.813542 42.0466 0.807037 50.1938C2.42762 58.341 6.42773 65.8247 12.3015 71.6985C18.1753 77.5723 25.659 81.5724 33.8062 83.193C41.9534 84.8135 50.3982 83.9818 58.0727 80.8029C65.7472 77.624 72.3067 72.2408 76.9217 65.3339C81.5367 58.4271 84 50.3068 84 42C84 30.8609 79.575 20.178 71.6985 12.3015C63.822 4.42499 53.1391 0 42 0ZM61.2889 60.5796C60.9258 61.1718 60.3427 61.596 59.6675 61.7593C58.9923 61.9225 58.2798 61.8116 57.6862 61.4507C47.824 55.4213 35.4107 54.0587 20.7885 57.4C20.1257 57.5184 19.4428 57.3771 18.8815 57.0053C18.3202 56.6336 17.9235 56.0601 17.7738 55.4037C17.6241 54.7473 17.7329 54.0585 18.0776 53.4802C18.4223 52.9018 18.9764 52.4784 19.6249 52.2978C35.6222 48.6391 49.3484 50.2133 60.4178 56.9769C61.0059 57.344 61.4249 57.9289 61.5834 58.6038C61.742 59.2787 61.6271 59.989 61.264 60.5796H61.2889ZM66.4285 49.1369C65.9741 49.8772 65.2445 50.407 64.3999 50.61C63.5553 50.813 62.6647 50.6726 61.9236 50.2195C50.6364 43.2818 33.4258 41.272 20.0729 45.3227C19.242 45.5751 18.3448 45.4872 17.5788 45.0782C16.8127 44.6692 16.2405 43.9727 15.988 43.1418C15.7355 42.3109 15.8235 41.4137 16.2325 40.6477C16.6414 39.8816 17.338 39.3094 18.1689 39.0569C33.4196 34.4275 52.3911 36.6738 65.3458 44.6569C66.0777 45.1128 66.5997 45.8397 66.7978 46.6789C66.996 47.5182 66.8542 48.4017 66.4036 49.1369H66.4285ZM66.8702 37.2338C53.3058 29.1884 30.9742 28.4542 18.0445 32.3742C17.5493 32.5237 17.0295 32.5743 16.5148 32.5229C16.0001 32.4716 15.5006 32.3194 15.0447 32.075C14.124 31.5814 13.4371 30.7423 13.1351 29.7422C12.9856 29.247 12.9351 28.7273 12.9864 28.2126C13.0377 27.6979 13.19 27.1983 13.4344 26.7424C13.6788 26.2866 14.0106 25.8833 14.4108 25.5557C14.8111 25.228 15.272 24.9824 15.7671 24.8329C30.6071 20.328 55.2658 21.1991 70.8524 30.4329C71.2961 30.696 71.6837 31.0439 71.9929 31.4568C72.3021 31.8697 72.527 32.3394 72.6547 32.8392C72.7824 33.339 72.8104 33.859 72.7371 34.3696C72.6638 34.8802 72.4907 35.3714 72.2276 35.8151C71.9644 36.2588 71.6165 36.6463 71.2036 36.9556C70.7908 37.2648 70.321 37.4897 69.8212 37.6174C69.3215 37.745 68.8014 37.773 68.2908 37.6997C67.7802 37.6265 67.289 37.4533 66.8453 37.1902L66.8702 37.2338Z"
                  fill="#7BD568"
                />
                <path
                  d="M61.2642 60.5796C60.9011 61.1718 60.3181 61.596 59.6428 61.7593C58.9676 61.9226 58.2552 61.8116 57.6616 61.4507C47.7993 55.4214 35.386 54.0587 20.7638 57.4C20.101 57.5184 19.4182 57.3771 18.8568 57.0054C18.2955 56.6337 17.8989 56.0601 17.7492 55.4037C17.5995 54.7473 17.7083 54.0585 18.0529 53.4802C18.3976 52.9019 18.9517 52.4785 19.6002 52.2978C35.5976 48.6392 49.3238 50.2134 60.3931 56.9769C60.9854 57.3401 61.4096 57.9231 61.5728 58.5983C61.7361 59.2736 61.6251 59.986 61.2642 60.5796Z"
                  fill="#010201"
                />
                <path
                  d="M66.4037 49.1369C65.9493 49.8773 65.2198 50.4071 64.3752 50.61C63.5306 50.813 62.6399 50.6726 61.8988 50.2196C50.6117 43.2818 33.401 41.272 20.0481 45.3227C19.2172 45.5752 18.3201 45.4873 17.554 45.0783C16.7879 44.6693 16.2157 43.9727 15.9632 43.1418C15.7107 42.3109 15.7987 41.4138 16.2077 40.6477C16.6167 39.8816 17.3132 39.3094 18.1441 39.0569C33.3948 34.4276 52.3663 36.6738 65.321 44.6569C66.0571 45.1088 66.5842 45.8339 66.7871 46.6734C66.99 47.513 66.8521 48.3987 66.4037 49.1369Z"
                  fill="#010201"
                />
                <path
                  d="M66.8452 37.2339C53.3056 29.1886 30.9741 28.4543 18.0443 32.3743C17.5491 32.5239 17.0294 32.5744 16.5147 32.5231C16 32.4717 15.5004 32.3195 15.0445 32.0751C14.1239 31.5815 13.437 30.7424 13.135 29.7423C12.9854 29.2472 12.9349 28.7274 12.9863 28.2127C13.0376 27.698 13.1898 27.1984 13.4342 26.7426C13.6786 26.2867 14.0104 25.8834 14.4107 25.5558C14.8109 25.2281 15.2718 24.9825 15.767 24.833C30.607 20.3281 55.2656 21.1992 70.8523 30.433C71.296 30.6961 71.6835 31.044 71.9927 31.4569C72.302 31.8698 72.5269 32.3395 72.6545 32.8393C72.7822 33.3391 72.8102 33.8591 72.7369 34.3698C72.6637 34.8804 72.4905 35.3715 72.2274 35.8152C71.9643 36.2589 71.6164 36.6464 71.2035 36.9557C70.7906 37.2649 70.3209 37.4898 69.8211 37.6175C69.3213 37.7452 68.8013 37.7732 68.2907 37.6999C67.78 37.6266 67.2889 37.4534 66.8452 37.1903V37.2339Z"
                  fill="#010201"
                />
              </svg>
            </div>
            <div className="flex justify-center flex-col ">
              <p className="text-primaryblue font-bold">Upload</p>
              <p className="text-md">Spotify Podcast </p>
            </div>
          </div>
          <div className="flex border border-secondarybg rounded-xl p-2 px-7 mt-5 ml-12 cursor-pointer">
            <div className="bg-primaryblue rounded-full  mr-3">
              <img className=" w-14 h-14" src={spotify} alt="amg" />
            </div>
            <div className="flex justify-center flex-col ">
              <p className="text-primaryblue font-bold">Upload From</p>
              <p className="text-mg">RSS Feed</p>
            </div>
          </div>
          <div className="flex border border-secondarybg rounded-xl p-2 px-7 mt-5 mr-14 cursor-pointer">
            <div className="bg-primaryblue rounded-full  mr-3">
              <svg
                className=" w-14 h-14"
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="83"
                viewBox="0 0 84 83"
                fill="none"
              >
                <path
                  d="M42 82.7077C65.196 82.7077 84 64.1929 84 41.3538C84 18.5147 65.196 0 42 0C18.804 0 0 18.5147 0 41.3538C0 64.1929 18.804 82.7077 42 82.7077Z"
                  fill="#DA0000"
                />
                <path
                  d="M68.824 28.0839C68.5067 26.9074 67.8792 25.8344 67.005 24.9737C66.1308 24.113 65.0411 23.4951 63.8462 23.1827C59.5093 22.0554 42 22.0554 42 22.0554C42 22.0554 24.4844 22.0554 20.1164 23.2072C18.9273 23.5243 17.844 24.1443 16.9756 25.0047C16.1072 25.8651 15.4844 26.9356 15.1698 28.1084C14 32.3969 14 41.3784 14 41.3784C14 41.3784 14 50.3476 15.1698 54.6484C15.4844 55.8212 16.1072 56.8917 16.9756 57.7521C17.844 58.6125 18.9273 59.2325 20.1164 59.5496C24.472 60.7014 42 60.7014 42 60.7014C42 60.7014 59.5093 60.7014 63.8773 59.5496C65.0722 59.2372 66.1619 58.6193 67.0361 57.7586C67.9103 56.8978 68.5378 55.8249 68.8551 54.6484C70.0311 50.3598 70.0311 41.3784 70.0311 41.3784C70.0311 41.3784 70 32.3847 68.824 28.0839ZM36.4 49.6247V33.0831L50.9413 41.3539L36.4 49.6247Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex justify-center flex-col ">
              <p className="text-primaryblue font-bold text-lg">Upload</p>
              <p className="text-md"> youtube Video</p>
            </div>
          </div>
          <div className="flex border border-secondarybg rounded-xl p-2 px-7 ml-7 mt-5 mr-12 cursor-pointer">
            <div className="bg-primaryblue rounded-full  mr-3">
              <svg
                className=" w-14 h-14"
                xmlns="http://www.w3.org/2000/svg"
                width="84"
                height="84"
                viewBox="0 0 84 84"
                fill="none"
              >
                <path
                  d="M42 0C33.6932 0 25.5729 2.46326 18.6661 7.07828C11.7592 11.6933 6.37596 18.2528 3.19708 25.9273C0.018198 33.6018 -0.813542 42.0466 0.807037 50.1938C2.42762 58.341 6.42773 65.8247 12.3015 71.6985C18.1753 77.5723 25.659 81.5724 33.8062 83.193C41.9534 84.8135 50.3982 83.9818 58.0727 80.8029C65.7472 77.624 72.3067 72.2408 76.9217 65.3339C81.5367 58.4271 84 50.3068 84 42C84 30.8609 79.575 20.178 71.6985 12.3015C63.822 4.42499 53.1391 0 42 0ZM61.2889 60.5796C60.9258 61.1718 60.3427 61.596 59.6675 61.7593C58.9923 61.9225 58.2798 61.8116 57.6862 61.4507C47.824 55.4213 35.4107 54.0587 20.7885 57.4C20.1257 57.5184 19.4428 57.3771 18.8815 57.0053C18.3202 56.6336 17.9235 56.0601 17.7738 55.4037C17.6241 54.7473 17.7329 54.0585 18.0776 53.4802C18.4223 52.9018 18.9764 52.4784 19.6249 52.2978C35.6222 48.6391 49.3484 50.2133 60.4178 56.9769C61.0059 57.344 61.4249 57.9289 61.5834 58.6038C61.742 59.2787 61.6271 59.989 61.264 60.5796H61.2889ZM66.4285 49.1369C65.9741 49.8772 65.2445 50.407 64.3999 50.61C63.5553 50.813 62.6647 50.6726 61.9236 50.2195C50.6364 43.2818 33.4258 41.272 20.0729 45.3227C19.242 45.5751 18.3448 45.4872 17.5788 45.0782C16.8127 44.6692 16.2405 43.9727 15.988 43.1418C15.7355 42.3109 15.8235 41.4137 16.2325 40.6477C16.6414 39.8816 17.338 39.3094 18.1689 39.0569C33.4196 34.4275 52.3911 36.6738 65.3458 44.6569C66.0777 45.1128 66.5997 45.8397 66.7978 46.6789C66.996 47.5182 66.8542 48.4017 66.4036 49.1369H66.4285ZM66.8702 37.2338C53.3058 29.1884 30.9742 28.4542 18.0445 32.3742C17.5493 32.5237 17.0295 32.5743 16.5148 32.5229C16.0001 32.4716 15.5006 32.3194 15.0447 32.075C14.124 31.5814 13.4371 30.7423 13.1351 29.7422C12.9856 29.247 12.9351 28.7273 12.9864 28.2126C13.0377 27.6979 13.19 27.1983 13.4344 26.7424C13.6788 26.2866 14.0106 25.8833 14.4108 25.5557C14.8111 25.228 15.272 24.9824 15.7671 24.8329C30.6071 20.328 55.2658 21.1991 70.8524 30.4329C71.2961 30.696 71.6837 31.0439 71.9929 31.4568C72.3021 31.8697 72.527 32.3394 72.6547 32.8392C72.7824 33.339 72.8104 33.859 72.7371 34.3696C72.6638 34.8802 72.4907 35.3714 72.2276 35.8151C71.9644 36.2588 71.6165 36.6463 71.2036 36.9556C70.7908 37.2648 70.321 37.4897 69.8212 37.6174C69.3215 37.745 68.8014 37.773 68.2908 37.6997C67.7802 37.6265 67.289 37.4533 66.8453 37.1902L66.8702 37.2338Z"
                  fill="#7BD568"
                />
                <path
                  d="M61.2642 60.5796C60.9011 61.1718 60.3181 61.596 59.6428 61.7593C58.9676 61.9226 58.2552 61.8116 57.6616 61.4507C47.7993 55.4214 35.386 54.0587 20.7638 57.4C20.101 57.5184 19.4182 57.3771 18.8568 57.0054C18.2955 56.6337 17.8989 56.0601 17.7492 55.4037C17.5995 54.7473 17.7083 54.0585 18.0529 53.4802C18.3976 52.9019 18.9517 52.4785 19.6002 52.2978C35.5976 48.6392 49.3238 50.2134 60.3931 56.9769C60.9854 57.3401 61.4096 57.9231 61.5728 58.5983C61.7361 59.2736 61.6251 59.986 61.2642 60.5796Z"
                  fill="#010201"
                />
                <path
                  d="M66.4037 49.1369C65.9493 49.8773 65.2198 50.4071 64.3752 50.61C63.5306 50.813 62.6399 50.6726 61.8988 50.2196C50.6117 43.2818 33.401 41.272 20.0481 45.3227C19.2172 45.5752 18.3201 45.4873 17.554 45.0783C16.7879 44.6693 16.2157 43.9727 15.9632 43.1418C15.7107 42.3109 15.7987 41.4138 16.2077 40.6477C16.6167 39.8816 17.3132 39.3094 18.1441 39.0569C33.3948 34.4276 52.3663 36.6738 65.321 44.6569C66.0571 45.1088 66.5842 45.8339 66.7871 46.6734C66.99 47.513 66.8521 48.3987 66.4037 49.1369Z"
                  fill="#010201"
                />
                <path
                  d="M66.8452 37.2339C53.3056 29.1886 30.9741 28.4543 18.0443 32.3743C17.5491 32.5239 17.0294 32.5744 16.5147 32.5231C16 32.4717 15.5004 32.3195 15.0445 32.0751C14.1239 31.5815 13.437 30.7424 13.135 29.7423C12.9854 29.2472 12.9349 28.7274 12.9863 28.2127C13.0376 27.698 13.1898 27.1984 13.4342 26.7426C13.6786 26.2867 14.0104 25.8834 14.4107 25.5558C14.8109 25.2281 15.2718 24.9825 15.767 24.833C30.607 20.3281 55.2656 21.1992 70.8523 30.433C71.296 30.6961 71.6835 31.044 71.9927 31.4569C72.302 31.8698 72.5269 32.3395 72.6545 32.8393C72.7822 33.3391 72.8102 33.8591 72.7369 34.3698C72.6637 34.8804 72.4905 35.3715 72.2274 35.8152C71.9643 36.2589 71.6164 36.6464 71.2035 36.9557C70.7906 37.2649 70.3209 37.4898 69.8211 37.6175C69.3213 37.7452 68.8013 37.7732 68.2907 37.6999C67.78 37.6266 67.2889 37.4534 66.8452 37.1903V37.2339Z"
                  fill="#010201"
                />
              </svg>
            </div>
            <div className="flex justify-center flex-col ">
              <p className="text-primaryblue font-bold">Upload</p>
              <p className="text-md">Spotify Podcast </p>
            </div>
          </div>
          <div className="flex border border-secondarybg rounded-xl p-2 px-7 mt-5 ml-12 cursor-pointer">
            <div className="bg-primaryblue rounded-full  mr-3">
              <img className=" w-14 h-14" src={spotify} alt="" />
            </div>
            <div className="flex justify-center flex-col ">
              <p className="text-primaryblue font-bold">Upload From</p>
              <p className="text-md">RSS Feed</p>
            </div>
          </div>
        </div>
        <div>
          <p className=" text-secondarygry text-xl text-center mt-7">or</p>
        </div>

        <div className="flex justify-center flex-col items-center border mt-5 rounded-lg p-5 mr-14 border-dashed border-slate-600">
          <div>
            <svg
              className=" w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="129"
              viewBox="0 0 128 129"
              fill="none"
            >
              <path
                d="M103.2 54.4666C99.5733 36.0666 83.4133 22.2533 64 22.2533C48.5867 22.2533 35.2 31 28.5333 43.8C12.48 45.5066 0 59.1066 0 75.5866C0 93.24 14.3467 107.587 32 107.587H101.333C116.053 107.587 128 95.64 128 80.92C128 66.84 117.067 55.4266 103.2 54.4666ZM101.333 96.92H32C20.2133 96.92 10.6667 87.3733 10.6667 75.5866C10.6667 64.6533 18.8267 55.5333 29.6533 54.4133L35.36 53.8266L38.0267 48.76C43.0933 39 53.0133 32.92 64 32.92C77.9733 32.92 90.0267 42.84 92.7467 56.5466L94.3467 64.5466L102.507 65.1333C110.827 65.6666 117.333 72.6533 117.333 80.92C117.333 89.72 110.133 96.92 101.333 96.92ZM42.6667 70.2533H56.2667V86.2533H71.7333V70.2533H85.3333L64 48.92L42.6667 70.2533Z"
                fill="#7E22CE"
              />
            </svg>
          </div>
          <div className="mt-4">
            <p className=" text-center text-base">
              Select a file or drag and drop here (Podcast Media or
              Transcription Text)
            </p>
            <p className=" text-center  text-sm text-slate-300">
              MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
            </p>
          </div>
          <button className=" border border-primaryblue rounded-full py-2 mt-5 text-primaryblue px-5">
            Select File
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-secondarybg bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl transition-opacity duration-300">
            <h2 className="text-2xl font-bold mb-4">Create Project</h2>
            {errorMessage && (
              <div className="text-red-500 text-xs mb-4">{errorMessage}</div>
            )}
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="projectName"
                placeholder="Type here..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={`w-full h-10 border ${
                  isFormValid ? "border-gray-300" : "border-red-500"
                } rounded p-2`}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectLink"
                className="block text-sm font-medium text-gray-700"
              >
                Link
              </label>
              <input
                type="text"
                id="projectLink"
                placeholder="Type here..."
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className={`w-full h-10 border ${
                  isFormValid ? "border-gray-300" : "border-red-500"
                } rounded p-2`}
              />
            </div>
            {!isFormValid && (
              <p className="text-red-500 text-xs mb-4">
                Project name Can't be empty
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className={` bg-btnblack text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Uploading...." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
