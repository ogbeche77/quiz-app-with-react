import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
          
      <h2 className="Player">Player: {user.email}</h2>
      
    </Fragment>
  );
};

export default Profile;