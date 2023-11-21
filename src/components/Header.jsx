
import React from 'react'
import logo from "../assets/logo.png"
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';




function Header() {
  const userData = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
     <div className='flex justify-between p-3 mt-4'>
        <div className='flex'>
            <img className=' w-8 h-8'
            src={logo}
            />
            <h className="text-2xl  font-medium text-primaryblue">LAMA.</h>
        </div>
        <div className='flex'>
        <div className=" w-10 h-10 bg-black rounded-full">
              <img
                src="https://images.unsplash.com/photo-1700336472296-a2b47e5222e2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="img"
                className=" object-cover w-full h-full rounded-full"
              />
            </div>
          <div className='mt-1 ml-1'>
          <p>User:{userData.username}</p>
          </div>
        <SettingsOutlinedIcon className=' w-8 h-8 mx-2'/>
        <NotificationsNoneRoundedIcon className=' w-8 h-8'/>

        </div>
     </div>

    </div>
  )
}

export default Header