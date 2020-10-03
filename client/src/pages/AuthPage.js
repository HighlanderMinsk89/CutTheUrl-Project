import React, { useState } from "react";

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Cut The URL</h1>
        <div className="card teal lighten-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="enter your email address"
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email" className="black-text">
                  Email
                </label>
              </div>

              <div className="input-field">
                <input
                  placeholder="enter your password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password" className="black-text">
                  Password
                </label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn lime lighten-2 black-text"
              style={{ marginRight: 10 }}
            >
              Login
            </button>
            <button className="btn grey lighten-1 black-text">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};
