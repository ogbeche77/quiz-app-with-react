// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";


const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button className="NavBar" onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated &&  <button className="NavBar" onClick={() => logout()}>Log out</button>}

      

    </div>
  );
};

export default NavBar;