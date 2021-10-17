import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Cookies from "universal-cookie";


export default function Login() {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [failureMessageBool, setFailureMessageBool] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const history = useHistory();
  const cookies = new Cookies();

  if (cookies.get("uuid")) {
    history.push("/userhome");
  }

  const handleSubmit = () => {
    axios
      .post("https://treasurehacks2021.pythonanywhere.com/v1/user/login", {
        email: emailText,
        password: passwordText,
      })
      .then((response) => {
        if (response.data.success == false) {
          setFailureMessageBool(true);
          if (response.data.warnings.length > 0) {
            setFailureMessage(response.data.warnings[0]);
          } else {
            setFailureMessage(response.data.errors[0]);
          }
        } else {
          cookies.set("uuid", response.data.json.uuid, {path: "/"});
          cookies.set("id_token", response.data.json.id_token, {path:"/"});
          history.push("/projects");
          window.location.reload();
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {failureMessageBool ? (
        <div class="notification is-danger">{failureMessage}</div>
      ) : null}
      <p class="is-size-1 has-text-centered">LOGIN</p>
      <div class="field mx-6 mt-3">
        <label class="label">Email:</label>
        <div class="control ">
          <input
            class="input"
            type="email"
            placeholder="Email input"
            value={emailText}
            onChange={(e) => {
              setEmailText(e.target.value);
            }}
          />
        </div>{" "}
      </div>
      <div class="field mx-6 mt-3">
        <label class="label">Password:</label>
        <div class="control ">
          <input
            class="input"
            type="password"
            placeholder="Password input"
            value={passwordText}
            onChange={(e) => {
              setPasswordText(e.target.value);
            }}
          />
        </div>
      </div>
      <div class="has-text-centered">
        <button class="button is-link mt-3" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
