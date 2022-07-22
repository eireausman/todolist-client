import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

interface LogOutProps {
  userIsLoggedIn: boolean;
  setuserIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Logout: React.FC<LogOutProps> = ({
  userIsLoggedIn,
  setuserIsLoggedIn,
}) => {
  const [tokenStatus, settokenStatus] = useState<Boolean>(true);

  const clearLocalStorageToken = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    clearLocalStorageToken();
  }, []);

  return (
    <div>
      {/* need to add some checks to make sure the store is actually cleared before rendering confimration */}
      <Alert variant="success">
        You have now been logged out.
        <Link to="/login">Click here to log back in</Link>
      </Alert>
    </div>
  );
};

export default Logout;
