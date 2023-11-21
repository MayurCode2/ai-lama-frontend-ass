import Header from '../../components/Header';
import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';    
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProjects,setSelectedProject } from './projectSlice';
import { useEffect } from 'react';


function Projects() {

    const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the history object for navigation
  const projects = useSelector((state) => state.projects.projects);
  console.log(projects)

  useEffect(() => {
    // Fetch projects when the component mounts
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleProjectClick = (project) => {
    // Set the selected project in the Redux store
    dispatch(setSelectedProject(project));
    // Navigate to the project upload page with the project name
    navigate("/upload");
  };
console.log(projects)

  return (
    <div>
      <Header/>
      <div className='flex justify-center mt-4'>
      <div className=' w-10/12'>
      <div onClick={()=>navigate("/home")} className=' cursor-pointer flex justify-center shadow-lg border border-secondarytext rounded-full w-40'> 
        <HomeOutlinedIcon/>
        <p>Back to Home</p>
      </div>

      <div  className='flex justify-between flex-wrap mt-4'>
        <h1 className='text-4xl text-center font-bold text-primaryblue'>Projects</h1>
        <button
     
        className=" bg-black text-white px-6 py-2  flex items-center text-center rounded-md  "
      >
       <AddCircleRoundedIcon className=' w-8 h-8'/>
        <span className=" text-center text-xl">Create New Project</span>
      </button>
      </div>

      {/* card grid */}
      <div className='flex justify-between flex-wrap'>
        
      {projects.map((project) => (
  <div
    key={project._id}
    className='flex border border-secondarybg rounded-xl p-2 pr-14 mt-12 cursor-pointer'
    onClick={() => handleProjectClick(project)}
  >
    <div className='bg-primaryblue rounded-xl p-5 mr-3'>
      <h1 className='text-5xl text-center text-white font-medium'>
        {project.title.slice(0, 2).toUpperCase()}
      </h1>
    </div>
    <div className='flex justify-center flex-col mt-3'>
      <p className='text-primaryblue font-bold'>{project.title}</p>
      <p className='text-xs'>{project.episodes.length} episodes</p>
      <p className='text-secondarytext text-xs mt-6'>Last edited a week ago</p>
    </div>
  </div>
))}
      </div>
      </div>
    </div>
    </div>
  )
}

export default Projects