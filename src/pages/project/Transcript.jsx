import React from "react";
import Sidebar from "../../components/Sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useSelector } from "react-redux";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CreateIcon from '@mui/icons-material/Create';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEpisode  } from "./projectSlice";
import { useNavigate } from "react-router-dom";

function Transcript() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [originalText, setOriginalText] = useState("");


  const dispatch = useDispatch();
  const navigate= useNavigate()
  const selectedEpisode = useSelector(
    (state) => state.projects.selectedEpisode
  );
  console.log(selectedEpisode);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  console.log((selectedProject._id));

  useEffect(() => {
    // When the selected episode changes, update the description in the textarea
    if (selectedEpisode) {
      setOriginalText(selectedEpisode.description);
      setEditedText(selectedEpisode.description);
    }
  }, [selectedEpisode]);

  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDiscardClick = () => {
    setIsEditing(false);
    setEditedText(originalText);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);

 
    try {
      // Dispatch the updateEpisode action to update the description on the server
      console.log(selectedEpisode.id)
      await dispatch(updateEpisode({
        projectId: selectedProject._id,
        episodeId: selectedEpisode.id,
        description: editedText,
        status: selectedEpisode.status,
      }));
    } catch (error) {
      console.error('Error updating episode:', error.message);
    }
  };
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex">
      <div className=" md:w-1/4 lg:w-1/4">
        <Sidebar />
      </div>
      <div className="md:w-3/4  lg:w-3/4 ml-9">
      <div className="flex justify-between mt-7 ml-5 mr-4">
          <div className="flex">
            <HomeOutlinedIcon />
            <p>/ {selectedProject.title} /</p>
            <p className=" text-primaryblue ml-1">Transcript</p>
            <button onClick={()=> navigate("/episodes")} className=" border border-primaryblue text-primaryblue ml-2 px-1 text-xs rounded-md"
            >go back</button>
          </div>
          <div className="flex mr-4">
            <div className="w-7 h-7 rounded-full mx-3 bg-lime-600"></div>
            <p>{userData.username}</p>
            <NotificationsOutlinedIcon className="h-8" />
          </div>
        </div>
        <div className=" flex justify-between ml-6 mb-7 mt-4">
          <h1 className=" text-3xl text-primaryblue">Edite Transcript</h1>
          <div className="mr-10">
              {isEditing && (
                <>
                  <button
                    className="px-8 py-2 mr-2  text-primaryred border border-primaryred rounded"
                    onClick={handleDiscardClick}
                  >
                    Discard
                  </button>
                  <button
                    className="px-6 py-2  bg-btnblack text-white"
                    onClick={handleSaveClick}
                  >
                    Save& exit
                  </button>
                </>
              )}
            </div>
        </div>

          <div className="">
            
            <div className=" border-2 border-primaryblue p-2 ml-7 mr-10 rounded-lg ">
                <div className="flex justify-between">
                <button onClick={handleEditClick} className=" bg-zinc-800 text-white rounded-full p-2 px-3 text-xs m-2 ">Edite Mode</button>
                   <SearchRoundedIcon className=" w-5 h-5"/>
                </div>
                <p className=" text-primaryblue">Speaker</p>
                <div>
              <textarea
                style={{ resize: "none" }}
                className=" w-full h-96 bg-white "
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                disabled={!isEditing}

              />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Transcript;
