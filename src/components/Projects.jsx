import React, { useState, useEffect, useCallback } from "react";
import Project from "./Project";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";

export default function Projects() {
  const [showPopup, setShowPopup] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureMessageBool, setFailureMessageBool] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const cookies = new Cookies();
  const history = new useHistory();

  const [userData, setUserData] = useState({});

  const db = getDatabase();
  const chatRef = ref(db, 'ResearchProjects');

  function getDateTimeFromTimestamp(unixTimeStamp) {
    let date = new Date(unixTimeStamp);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
  }

  async function updateUserDataIfNeeded(user) {
    console.log(user);
    if (!userData[user]){
        const thing = await axios ({
           method:"post",
           url: "https://treasurehacks2021.pythonanywhere.com/v1/user/" + user
        });
        if (thing.data.success){
          setUserData((prevState) => {
            return(
              {
                ...prevState,
                [user]: thing.data.json
              }

            )

          })
        }
    }
  }

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
  const getProjects = useCallback(() => {

    onChildAdded(chatRef, async (data) => {
      const cur_proj = data.val()
      await updateUserDataIfNeeded(cur_proj.user_created);
      setProjects((prevState) => {
        return [cur_proj, ...prevState]
      })

    });
    /*
    const data = axios ({
      method: "post",
      url: "https://treasurehacks2021.pythonanywhere.com/v1/project"
    }).then(async (data) => {
      for (var key in data.data.json){
        await updateUserDataIfNeeded(data.data.json[key].user_created);
        setProjects((prevState) => {
          return [data.data.json[key], ...prevState]
        })
      }

    });
    */
  }, [])

  useEffect(() => {
    getProjects();
  }, [getProjects]);

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

      <div class="has-text-centered mt-3">
        <button
          class="button is-link"
          onClick={(e) => setShowPopup(" is-active")}
        >
          Add Project
        </button>
      </div>
      <div class="container" style={{overflowY: 'scroll', height: '90vh'}}>
        {projects.map((project) => {
          //   <Project
          //         imgURL="https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/money-heist-season-4-professor_2.jpg"
          //         name="Professor Scott"
          //         field="Computer Science"
          //         description="Work on new exciting machine learning technology!!"
          //         time="11:09 PM - 1 Jan 2016"
          // />
            try{
              return <Project key = {project['project_id']}  id = {project['project_id']} imgURL={userData[project.user_created]['profile_pic']} name={userData[project.user_created]['first_name'] + " " + userData[project.user_created]['last_name']} field={userData[project.user_created]['field_of_study']} description={project.description} time={getDateTimeFromTimestamp(+project.iat * 1000)} title={project.title}/>
            } catch (error){
              console.log(userData);
            }

        })}
      </div>
    </div>
  );
}
