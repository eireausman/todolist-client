import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form action="" method="POST">
        <label htmlFor="username">Username</label>
        <input name="username" placeholder="username" type="text" />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
