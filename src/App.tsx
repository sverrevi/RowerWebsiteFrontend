import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import RowingClubList from "./components/RowingClubsList";
import RowerList from "./components/RowerList";
import HomeContent from "./components/HomeContent";
import LoginComponent from "./components/LoginComponent";
import ProtectedContent from "./components/ProtectedComponent";
import "./App.css";
import { UserContext } from "./lib/context";
import { storeCredentials, getAuthenticatedUserOrNull, clearCredentials } from "./lib/auth";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getUsernameOrNull() {
      const username = await getAuthenticatedUserOrNull();
      setCurrentUser(username);
    }
    getUsernameOrNull();
  }, []);

  const login = useCallback((response: any) => {
    storeCredentials(response.token);
    setCurrentUser(response.username);
  }, []);

  const logout = useCallback(() => {
    clearCredentials();
    setCurrentUser(null);
    

  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      login,
    }),
    [currentUser, login]
  );

 

  return (
    <UserContext.Provider value={{ username: currentUser }}>
      <Router>
        <div>
          <NavigationBar logout={logout} />
          <Routes>
            <Route path="/protected" element={<ProtectedContent />} />
            <Route path="/rowingclubs" element={<RowingClubList />} />
            <Route path="/rowers" element={<RowerList />} />
            <Route path="/login" element={<LoginComponent onLogin={login} />} />
            <Route path="/" element={<HomeContent />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
