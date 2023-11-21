
import React from "react";
import logo from "../assets/logo.png";

import { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Button from "./Button"
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const [activeButton, setActiveButton] = useState(null);
  const navigate=useNavigate()

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="flex h-full">
      <div className="bg-secondaryblue min-h-screen w-full">
        <div className="p-4">
        <Link to={"/home"}>
          <div className="flex flex-row">
          
            <img className="w-8 h-8" src={logo} />
          
            <h className="text-2xl font-medium text-primaryblue">LAMA</h>
          </div>
          </Link>
        </div>
       
        <p className="text-xs ml-7">Podcast Upload Flow</p>

        <div className="mt-3 px-2 flex flex-col ">
          <div className="flex flex-col border-b">
          <Link to={"/upload"} >
            <Button
             isStarting={true}
              label="Projects"
              active={activeButton === "projects"}
              onClick={() => handleButtonClick("projects")}
             index={1}
            />
            </Link>
            <Link to={"/widgestConfiguration"} >
            <Button
              label="Wedges Configuration"
              active={activeButton === "wedges"}
              onClick={() => handleButtonClick("wedges")}
              index={2}
              
            />
            </Link>
         
            <Button
              label="Development"
              active={activeButton === "development"}
              onClick={() => handleButtonClick("development")}
              index={3}
            />
       
            <Button 
              label="Pricing"
              active={activeButton === "pricing"}
              onClick={() => handleButtonClick("pricing")}
              index={4}
            />
          </div>
         
          <div className=" mt-80 border-t">
            <Link to={"/settings"} >
            <Button
              label="Settings"
              index={<SettingsOutlinedIcon />}
              active={activeButton === "settings"}
              onClick={() => handleButtonClick("settings")}
            />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
