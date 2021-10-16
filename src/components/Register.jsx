import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";

export default function Register() {
  const [firstNameText, setFirstNameText] = useState("");
  const [lastNameText, setLastNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [fieldOfStudyText, setFieldOfStudyText] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureMessageBool, setFailureMessageBool] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const cookies = new Cookies();
  const history = new useHistory();

  if (cookies.get("uuid")) {
    history.push("/userhome");
  }

  const handleSubmit = () => {
    axios
      .post("https://treasurehacks2021.pythonanywhere.com/v1/user/register", {
        email: emailText,
        password: passwordText,
      })
      .then((response) => {
        if (response.data.success) {
          const resp = axios({
            method: "patch",
            url:
              "https://treasurehacks2021.pythonanywhere.com/v1/user/" +
              response.data.json.uuid,
            data: {
              first_name: firstNameText,
              last_name: lastNameText,
              field_of_study: fieldOfStudyText,
              experience: experienceText,
            },
            headers: {
              Authorization: cookies.get("id_token"),
            },
          }).then(console.log(resp));
          setSuccessAlert(true);
          setFailureMessageBool(false);
        } else {
          setFailureMessageBool(true);
          if (response.data.warnings.length > 0) {
            setFailureMessage(response.data.warnings[0]);
          } else {
            setFailureMessage(response.data.errors[0]);
          }
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {successAlert ? (
        <div class="notification is-primary">
          Registration succeeded! Please verify your email
        </div>
      ) : null}
      {failureMessageBool ? (
        <div class="notification is-danger">{failureMessage}</div>
      ) : null}
      <p class="is-size-1 has-text-centered">REGISTER</p>
      <div class="field mx-6 mt-3">
        <label class="label">First Name:</label>
        <div class="control ">
          <input
            class="input"
            type="text"
            placeholder="First name input"
            value={firstNameText}
            onChange={(e) => {
              setFirstNameText(e.target.value);
            }}
          />
        </div>
      </div>
      <div class="field mx-6 mt-3">
        <label class="label">Last Name:</label>
        <div class="control ">
          <input
            class="input"
            type="text"
            placeholder="Last name input"
            value={lastNameText}
            onChange={(e) => {
              setLastNameText(e.target.value);
            }}
          />
        </div>
      </div>
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
        </div>
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
      <div class="field mx-6 mt-3">
        <label class="label">Field of Study:</label>
        <div class="control ">
          <input
            class="input"
            type="text"
            placeholder="Field of Study input"
            value={fieldOfStudyText}
            onChange={(e) => {
              setFieldOfStudyText(e.target.value);
            }}
          />
        </div>
      </div>
      <div class="field mx-6 mt-3">
        <label class="label">Experience:</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Please type a brief summary of your experience to your field of study"
            value={experienceText}
            onChange={(e) => {
              setExperienceText(e.target.value);
            }}
          ></textarea>
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
