// App.js
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Calendar from "./Pages/Calendar";
import User from "./Pages/User";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { AuthProvider } from "./Common/Authstate";
import AccountDropdown from "./Pages/components/AccountDropdown";

const App = () => {

    return(
        <AuthProvider>
            <BrowserRouter>
                <AppContent/>
            </BrowserRouter>             
        </AuthProvider>
    );
};

const AppContent = () => {

    {/* 특정 위치에서만 계정 드롭다운을 숨김 */}
    const location = useLocation();
    const hideAccountDropdown = location.pathname === "/" || location.pathname === "/Signup";
  
    return (
      <>
        {!hideAccountDropdown && <AccountDropdown />}
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/User" element={<User />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Main" element={<Calendar />} />
        </Routes>
      </>
    );
  };

export default App;