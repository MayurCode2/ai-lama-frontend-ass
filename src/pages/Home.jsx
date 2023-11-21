
import React, { useState,useEffect } from 'react';
import homepic from "../assets/homepic.svg"
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';    
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import {createProject} from "../pages/project/projectSlice"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigation =useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      resetForm();
    };
  
    const resetForm = () => {
      setProjectName('');
      setIsFormValid(true);
      setErrorMessage('');
      setIsLoading(false); // Reset loading state
    };
  
    const handleCreateProject = async () => {
      try {
        setIsLoading(true); // Set loading to true when starting the project creation
        // Dispatch the createProject action with the project data
        await dispatch(createProject({ title: projectName }));
        // Close the modal and reset the form on successful creation
        closeModal();
        navigation('/projects');
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred while creating the project.');
      } finally {
        setIsLoading(false); // Set loading to false whether successful or not
      }
    };
  
    const validateForm = () => {
      if (projectName.trim() === '') {
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
    };
  

  return (
    <div>
        <Header/>
        <div onClick={()=>navigation("/projects")}  className=' cursor-pointer ml-20 flex justify-center shadow-lg border border-secondarytext  rounded-full w-40'> 
        <HomeOutlinedIcon/>
        <p>Back to Projects</p>
      </div>
    <div className="flex flex-col items-center justify-center min-h-screen">
   
      <h1 className=" text-6xl font-bold text-primaryblue mb-3 text-center">Create a new Project</h1>
      <div className="max-w-full w-80 mb-4">
        <img
          src={homepic}
          alt="home pic"
          layout="responsive"
          className="object-cover rounded-lg"
        />
      </div>
      <div className="text-center mb-4 md:px-52">
        <p className="mb-2">This is the first line. Lorem ipsum dolor sit ametThis is the third line. Nulla convallis libero in nisl suscipit This .</p>
        <p className="mb-2">This is the second line. Consectetur adipiscing elit.This is the third line. Nulla convallis libero in nisl suscipit</p>
        <p>This is the third line. Nulla convallis libero in nisl suscipit.This is the third line. Nulla convallis libero in nisl suscipit</p>
      </div>
      <button
        onClick={openModal}
        className=" bg-black text-white pl-6 py-2  flex items-center text-center rounded-md w-full max-w-xs"
      >
       
       <AddCircleRoundedIcon className=' w-8 h-8'/>
        <span className=" text-center text-2xl">Create New Project</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-secondarybg bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-3xl transition-opacity duration-300">
              <h2 className="text-2xl font-bold mb-4">Create Project</h2>
              {errorMessage && (
                <div className="text-red-500 text-xs mb-4">{errorMessage}</div>
              )}
              <div className="mb-4">
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                  Enter Project Name:
                </label>
                <input
                  type="text"
                  id="projectName"
                  placeholder='Type here...'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className={`w-full h-10 border ${isFormValid ? 'border-gray-300' : 'border-red-500'} rounded p-2`}
                />
              </div>
              {!isFormValid && <p className="text-red-500 text-xs mb-4">Project name Can't be empty</p>}
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="text-primaryred hover:text-gray-800 font-medium mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className={`bg-primaryblue text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
    </div>
  );
};

export default Home;
