import React, {useState} from "react";

export default function Register() {

    const [emailText, setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handleSubmit = () => {
        console.log(emailText);
        console.log(passwordText);
    }

  return (
    <div>
        <p class="is-size-1 has-text-centered">REGISTER</p>
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
        </div>      </div>
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
      <button class="button is-link mt-3" onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );
}
