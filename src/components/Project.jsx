import axios from "axios";
import React, {useState} from "react";
import Cookies from "universal-cookie";

export default function Project(props) {
  const cookies = new Cookies();
  const [showPopup, setShowPopup] = useState("");
  const [message, setMessage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [failureMessageBool, setFailureMessageBool] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  async function handleApply() {
    try {
      const resp = await axios({
        method: "post",
        url: "https://treasurehacks2021.pythonanywhere.com/v1/project/" + props.id + "/apply",
        data: {
          sender: cookies.get("uuid"),
          message: message
        },
        headers: {
          Authorization: cookies.get("id_token") 
        }
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
    } catch(error) {
      setFailureMessageBool(true);
      setFailureMessage(error);
    }
  }

  return (
    <div>
      <div class={"modal" + showPopup}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Apply to {props.title}</p>
            <button class="delete" aria-label="close" onClick={() => setShowPopup("")}></button>
          </header>
          <section class="modal-card-body">
          {successAlert ? (
                <div class="notification is-primary">
                  Successfully Applied to Project
                </div>
              ) : null}
              {failureMessageBool ? (
                <div class="notification is-danger">{failureMessage}</div>
              ) : null}
          <div class="field mx-6 mt-3">
                <label class="label">Message:</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="Please enter a message to the researcher"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" onClick={handleApply}>Apply</button>
            <button class="button" onClick={() => setShowPopup("")}>Cancel</button>
          </footer>
        </div>
      </div>
      <div class="card mx-6 mt-4">
        <header class="card-header">
          <p class="card-header-title is-centered">{props.title}</p>
        </header>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src={props.imgURL} height="48" width="48" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{props.name}</p>
              <p class="subtitle is-6">{props.field}</p>
            </div>
          </div>

          <div class="content has-text-centered">
            {props.description}
            <br />
            <time datetime="2016-1-1">{props.time}</time>
            <br />
            <button class="button is-primary mt-3" onClick={() => setShowPopup(" is-active")}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
