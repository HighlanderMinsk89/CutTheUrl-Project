import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const { login } = useContext(AuthContext);

  const { loading, errors, request, clearError } = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(errors);
    clearError();
  }, [errors, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      message(data.message);
      if (data.token) login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Cut The URL</h1>
        <div className="card green darken-1">
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
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
