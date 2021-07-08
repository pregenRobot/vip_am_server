import React, { useState, useRef } from "react";
import AuthDataService from "../services/auth.service";
import sha256 from "fast-sha256";

import { isEmail } from "validator";

function Register() {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const send = (event) => {
    event.preventDefault();
    //Send first time registration

    if (isRegister) {
      //If doing a registration process
      if (isValidEmail && isValidPassword && isValidPassword && isValidStatus) {
        //Only if registration will go successful

        AuthDataService.register({
          email: email,
          password: password,
          userName: name,
          userStatus: status,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      //Else doing a login process
    }
  };

  return (
    <div>
      <form
        className="submit-form form-group card mx-3 px-3"
        ref={form}
        onSubmit={send}
      >
        {isRegister ? ( //If user is trying to register, use a different set of form inputs
          <div>
            <h2 className="my-3">Register</h2>
            <div className="form-group my-3">
              <div>
                <label htmlFor="email">
                  <div className="mb-1">Email Address</div>
                </label>
                <input
                  type="text"
                  id="email"
                  required
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setEmail(value);
                    if (isEmail(value) && value.endsWith("@st-andrews.ac.uk")) {
                      setIsValidEmail(true);
                    } else {
                      setIsValidEmail(false);
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-group my-3">
              <div>
                <label htmlFor="email">
                  <div className="mb-1">Password</div>
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setPassword(value);
                    if (value.length < 40 && value.length > 6) {
                      setIsValidPassword(true);
                    } else {
                      setIsValidPassword(false);
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-group my-3">
              <div>
                <label htmlFor="name">
                  <div className="mb-1">Name</div>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setName(value);
                    if (value !== "") {
                      setIsValidName(true);
                    } else {
                      setIsValidName(false);
                    }
                  }}
                />
              </div>
            </div>
            <div className="form-group my-3">
              <div>
                <label htmlFor="yearOfStudy">
                  <div className="mb-1">Year of Study</div>
                </label>
                <select
                  className="form-control form-select"
                  required
                  id="name"
                  type="text"
                  onChange={(event) => {
                    const { value } = event.target;
                    setStatus(value);

                    if (value === "--Select one--") {
                      setIsValidStatus(false);
                    } else {
                      setIsValidStatus(true);
                    }
                  }}
                >
                  <option defaultValue>--Select one--</option>
                  <option disabled="disabled">Undergraduate</option>
                  <option value="u1">&nbsp; Year 1</option>
                  <option value="u2">&nbsp; Year 2</option>
                  <option value="u3">&nbsp; Year 3</option>
                  <option value="u4">&nbsp; Year 4</option>
                  <option disabled="disabled">Masters</option>
                  <option value="m1">&nbsp; Year 1</option>
                  <option value="m2">&nbsp; Year 2</option>
                  <option disabled="disabled">PhD</option>
                  <option value="phd">&nbsp; PhD</option>
                  <option disabled="disabled">Faculty</option>
                  <option value="faculty">&nbsp; Faculty</option>
                </select>
              </div>
            </div>
            <div className="link-primary my-3">
              <a
                onClick={(event) => {
                  setIsRegister(!isRegister);
                }}
                href="#"
              >
                Already have an account? Login here.
              </a>
            </div>
            <div className="my-3">
              <button className="btn btn-secondary">Register</button>
            </div>
          </div>
        ) : (
          // elements for logging in
          <div>
            <h2 className="my-3">Login</h2>
            <div className="form-group my-3">
              <div>
                <label htmlFor="email">
                  <div className="mb-1">Email Address</div>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setEmail(value);
                  }}
                />
              </div>
            </div>
            <div className="form-group my-3">
              <div>
                <label htmlFor="email">
                  <div className="mb-1">Password</div>
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setPassword(value);
                  }}
                />
              </div>
            </div>
            <div className="link-primary my-3">
              <a
                onClick={(event) => {
                  setIsRegister(!isRegister);
                }}
                href="#"
              >
                Need an account? Register here.
              </a>
            </div>
            <div className="my-3">
              <button className="btn btn-secondary">Login</button>
            </div>
          </div>
        )}
      </form>
      <div className="mx-3 my-3">
        {isRegister && !isValidEmail && email !== "" ? (
          <div className="alert alert-warning" role="alert">
            Invalid email. Please use email issued by the university.
          </div>
        ) : (
          <div></div>
        )}
        {isRegister && !isValidPassword && password !== "" ? (
          <div className="alert alert-warning" role="alert">
            Your password should be between 6 and 40 characters.
          </div>
        ) : (
          <div></div>
        )}
        {isRegister && !isValidName ? (
          <div className="alert alert-warning" role="alert">
            Your name property cannot be empty
          </div>
        ) : (
          <div></div>
        )}
        {isRegister && !isValidStatus ? (
          <div className="alert alert-warning" role="alert">
            Please select select a year of study if you are a student or faculty
            if you area faculty.
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Register;
