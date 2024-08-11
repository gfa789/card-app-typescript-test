import React from "react";
import NavBar from './components/NavBar'
import { DarkProvider, useDarkModeContext} from './utilities/darkModeContext'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // const { darkMode } = useDarkMode();
  // const { darkMode } = useDarkModeContext();

  return (
    <section className="dark:bg-gray-900 min-h-screen">
  <Router>
    <DarkProvider>
    <EntryProvider>
    {/* <div className={`${darkMode ? 'dark' : ''}`}> */}
    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<AllEntries/>}>
        </Route>
        <Route path="create" element={<NewEntry/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry/>}>
        </Route>
      </Routes>
    {/* </div> */}
    </EntryProvider>
    </DarkProvider>
    </Router>
    </section>
    
  );
}
