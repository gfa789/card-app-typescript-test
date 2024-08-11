import {NavLink} from 'react-router-dom'
import { useState } from 'react';
import SettingsDialog from './SettingsDialog';
import { useDarkModeContext } from '../utilities/darkModeContext';

export default function NavBar(){
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {darkMode, toggleDarkMode} = useDarkModeContext();
    return(
      <nav className="flex justify-center gap-5">
        <NavLink className="m-3 p-4 text-xl bg-blue-400 :hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-400 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 :hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-400 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
        {/* <button className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" onClick={() => setIsSettingsOpen(true)}>Settings</button>
         */}
         <SettingsDialog darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </nav>
    )
}