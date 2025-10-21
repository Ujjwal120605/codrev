import React from 'react'
import { BrainCircuit, Sun, Moon } from 'lucide-react';

// This function returns a Navbar component
const Navbar = ({ isDarkTheme, toggleTheme }) => {
  // Return a JSX element
  return (
    <>
      <div 
        className="nav flex items-center justify-between h-[90px]" 
        style={{
          padding:"0px 150px",
          backgroundColor: isDarkTheme ? '#18181b' : '#ffffff',
          borderBottom: `1px solid ${isDarkTheme ? '#27272a' : '#e4e4e7'}`
        }}
      >
        <div className="logo flex items-center gap-[10px]">
          <BrainCircuit size={30} color='#9333ea'/>
          <span 
            className="text-2xl font-bold ml-2"
            style={{ color: isDarkTheme ? '#ffffff' : '#000000' }}
          >
            CodRev
          </span>
        </div>
        <div className="icons flex items-center gap-[20px]">
          <i 
            className='cursor-pointer transition-all hover:text-[#9333ea]'
            onClick={toggleTheme}
            style={{ color: isDarkTheme ? '#ffffff' : '#000000' }}
          >
            {isDarkTheme ? <Sun/> : <Moon/>}
          </i>
        </div>
      </div>
    </>
  )
}

export default Navbar
