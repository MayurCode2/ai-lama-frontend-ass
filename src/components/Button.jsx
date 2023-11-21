import React from 'react';


function Button({ label, active, isStarting, onClick, index }) {
  const handleButtonClick = () => {
    // If the button is the starting button and it's already active, prevent deactivation
    if (isStarting && active) {
      return;
    }

    onClick();
  };
  

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className={`transition-all duration-300 px-4 py-2 rounded-full w-full ${
          active ? ' bg-primaryblue text-white active-button' : ' border-gray-300'
        } hover:bg-hoverbg focus:outline-none focus:ring focus:border-blue-300 flex`}
      >
        {typeof index === 'string' ? (
          // If index is a string, assume it's an image
          <img src={index} alt="Icon" className="w-6 h-6 bg-secondarygry rounded-full p-1" />
        ) : (
          // If index is not a string, assume it's a text
          <div className={`bg-secondarygry rounded-full h-6 text-center w-6 ${active ? 'bg-btnblack text-white' : ''}`}>
            {index}
          </div>
        )}
        <p className='text-xs mt-1 pl-1'>{label}</p>
      </button>
    </div>
  );
}

export default Button;
