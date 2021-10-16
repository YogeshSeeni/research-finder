import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Cookies from "universal-cookie/es6";
import axios from "axios";

export default function Profile() {
  const cookies = new Cookies();
  const history = new useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [experience, setExperience] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureMessageBool, setFailureMessageBool] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  if (!cookies.get("uuid")) {
    history.push("/");
  }

  async function getData() {
    const resp = await axios({
      method: "post",
      url:
        "https://treasurehacks2021.pythonanywhere.com/v1/user/" +
        cookies.get("uuid"),
    });
    setFirstName(resp.data.json.first_name);
    setLastName(resp.data.json.last_name);
    setImgURL(resp.data.json.profile_pic);
    setExperience(resp.data.json.experience);
    setFieldOfStudy(resp.data.json.field_of_study);
  }
  useEffect(() => {
    getData();
  }, []);

  async function updateData() {
      try {
        const resp = await axios({
            method: "patch",
            url: "https://treasurehacks2021.pythonanywhere.com/v1/user/" + cookies.get("uuid"),
            data: {
                first_name: firstName,
                last_name: lastName,
                field_of_study: fieldOfStudy,
                experience: experience,
            },
            headers: {
                Authorization: cookies.get("id_token")
            }
        });
        if (resp.data.success) {
            setSuccessAlert(true);
            setFailureMessageBool(false);
        } else {
            setSuccessAlert(false);
            setFailureMessageBool(true);
            if (resp.data.warnings.length > 0) {
            setFailureMessage(resp.data.warnings[0]);
            } else {
            setFailureMessage(resp.data.errors[0]);
            }
        }
      } catch (error) {
          setSuccessAlert(false);
          setFailureMessageBool(true);
          setFailureMessage(error);
      }
    
  }

  return (
    <div>
        {successAlert ? (
        <div class="notification is-primary">
          Successfully updated information!!!
        </div>
      ) : null}
      {failureMessageBool ? (
        <div class="notification is-danger">{failureMessage}</div>
      ) : null}
      <div class="has-text-centered mt-3">
        <img src={imgURL} width="250px" height="250px" />
      </div>
      <div class="field mx-6 mt-3">
        <label class="label">First Name:</label>
        <div class="control ">
          <input
            class="input"
            type="text"
            placeholder="First name input"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
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
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
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
            value={fieldOfStudy}
            onChange={(e) => {
              setFieldOfStudy(e.target.value);
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
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div class="has-text-centered">
        <button class="button is-link mt-3" onClick={updateData}>
          Update
        </button>
      </div>
    </div>
  );
}
