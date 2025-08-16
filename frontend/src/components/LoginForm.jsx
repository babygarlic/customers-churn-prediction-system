import { useState } from "react"

export default function Login(){
const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="login-form">
        <h1>Login</h1>
        <label htmlFor="username">User Name</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="password-input"
          />
        </div>
        <div className="checkbox-container">
          <label htmlFor="show-password">Show Password</label>
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          
        </div>
        <button className="login-button">Login</button>
      </div>
    </div>
  );
}