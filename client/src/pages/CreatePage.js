import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CreatePage = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (e) => {
    setLink(e.target.value);
  };

  const generateReq = async () => {
    try {
      const data = await request(
        "/api/link/generate",
        "POST",
        {
          from: link,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push(`/detail/${data.link._id}`);
    } catch (e) {}
  };

  const pressHandler = (e) => {
    if (e.key === "Enter") {
      generateReq();
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="insert link"
            id="link"
            type="text"
            name="link"
            value={link}
            onChange={changeHandler}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link" className="black-text">
            Enter link
          </label>
        </div>
        <button className="btn green darken-1" onClick={() => generateReq()}>
          Generate
        </button>
      </div>
    </div>
  );
};
