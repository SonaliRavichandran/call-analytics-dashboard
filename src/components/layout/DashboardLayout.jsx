import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

 useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);



  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDark(true);
  }, []);
 
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);


  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

      
      <div
        className={`${
          collapsed ? "w-16" : "w-60"
        } bg-gray-900 text-white p-4 transition-all duration-300`}
      >

        
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <h1 className="text-lg font-bold">Call Analytics</h1>}
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>
        </div>

        
        <ul className="space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {collapsed ? "D" : "Dashboard"}
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {collapsed ? "R" : "Reports"}
          </NavLink>

        </ul>

      </div>

     
      <div className="flex-1 p-6 text-gray-900 dark:text-white transition-colors">

        
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold">Dashboard Panel</h2>

          
          <div className="flex items-center p-1 gap-2 bg-slate-600 text-white">
            <span>Dark Mode</span>
            <Switch checked={dark} onCheckedChange={setDark} />
          </div>

        </div>

        {children}

      </div>

    </div>
  );
};

export default DashboardLayout;