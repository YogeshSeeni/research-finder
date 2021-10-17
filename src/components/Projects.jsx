import React, { useState } from "react";
import Project from "./Project";
import ResearchPosting from "./research-op-database/ResearchPosting";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";

export default function Projects() {
  const [showPopup, setShowPopup] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureMessageBool, setFailureMessageBool] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const cookies = new Cookies();
  const history = new useHistory();

  if (!cookies.get("uuid")) {
    history.push("/");
  }

  async function postProject() {
    try {
      const resp = await axios({
        method: "post",
        url: "https://treasurehacks2021.pythonanywhere.com/v1/project/new",
        data: {
          sender: cookies.get("uuid"),
          title: title,
          description: description,
        },
        headers: {
          Authorization: cookies.get("id_token"),
        },
      });
      console.log(resp);
      if (resp.data.success) {
        setSuccessAlert(true);
        setFailureMessageBool(false);
      } else {
        setFailureMessageBool(true);
        if (resp.data.warnings.length > 0) {
          setFailureMessage(resp.data.warnings[0]);
        } else {
          setFailureMessage(resp.data.errors[0]);
        }
      }
    } catch (error) {
      setFailureMessageBool(true);
      setFailureMessage(error);
    }
  }
  return (
    <div>
      <div class={"modal" + showPopup}>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title has-text-centered">Add Project</p>
              <button
                class="delete"
                aria-label="close"
                onClick={() => setShowPopup("")}
              ></button>
            </header>
            <section class="modal-card-body">
              {successAlert ? (
                <div class="notification is-primary">
                  Successfully Added Project
                </div>
              ) : null}
              {failureMessageBool ? (
                <div class="notification is-danger">{failureMessage}</div>
              ) : null}
              <div class="field mx-6 mt-3">
                <label class="label">Title of Project:</label>
                <div class="control ">
                  <input
                    class="input"
                    type="text"
                    placeholder="Title input"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="field mx-6 mt-3">
                <label class="label">Description:</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="Please type a brief description of the project you are posting"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" onClick={() => postProject()}>
                Post Project
              </button>
              <button class="button" onClick={() => setShowPopup("")}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>

      {/* <ResearchPosting title="Most Amazing Research" body="Here you will do the most exciting research."/> */}
      <div class="has-text-centered mt-3">
        <button
          class="button is-link"
          onClick={(e) => setShowPopup(" is-active")}
        >
          Add Project
        </button>
      </div>

      <Project
        imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
        name="Professor Scott"
        field="Computer Science"
        description="Work on new exciting machine learning technology!!"
        time="11:09 PM - 1 Jan 2016"
      />
      <Project
        imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
        name="Professor Scott"
        field="Computer Science"
        description="Work on new exciting machine learning technology!!"
        time="11:09 PM - 1 Jan 2016"
      />
      <Project
        imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
        name="Professor Scott"
        field="Computer Science"
        description="Work on new exciting machine learning technology!!"
        time="11:09 PM - 1 Jan 2016"
      />
      <Project
        imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
        name="Professor Scott"
        field="Computer Science"
        description="Work on new exciting machine learning technology!!"
        time="11:09 PM - 1 Jan 2016"
      />
      <Project
        imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
        name="Professor Scott"
        field="Computer Science"
        description="Work on new exciting machine learning technology!!"
        time="11:09 PM - 1 Jan 2016"
      />
      <Project
        imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
        name="Professor Scott"
        field="Computer Science"
        description="Work on new exciting machine learning technology!!"
        time="11:09 PM - 1 Jan 2016"
      />
      <Project
        imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
        name="Professor Scott"
        field="Computer Science"
        description="Work on new exciting machine learning technology!!"
        time="11:09 PM - 1 Jan 2016"
      />
    </div>
  );
}
