import axios from "axios";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DarkModeContextType } from "../@types/context";

export const DarkContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return <DarkContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkContext.Provider>;
};

export const useDarkModeContext = () => {
  const context = useContext(DarkContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
