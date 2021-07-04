import React, { useState, useRef } from "react";
import AuthDataService from "../services/auth.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

function Register() {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const send = (event) => {
    //Send first time registration
  };

  return (
    <div>
      <Form className="submit-form form-group card mx-3 px-3">
        {isRegister ? ( //If user is trying to register, use a different set of form inputs
          <div>
            <h2 className="my-3">Register</h2>
            <div className="form-group my-3">
              <div>
                <label htmlFor="email">
                  <div className="mb-1">Email Address</div>
                </label>
                <Input
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
                <Input
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
                <Input
                  type="text"
                  id="name"
                  required
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setName(value);
                  }}
                />
              </div>
            </div>
            <div className="link-primary my-3">
              <a
                onClick={(event) => {
                  setIsRegister(!isRegister);
                }}
              >
                Already have an account? Login here.
              </a>
            </div>
            <div className="my-3">
              <button onClick={send} className="btn btn-secondary">
                Register
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="my-3">Login</h2>
            <div className="form-group my-3">
              <div>
                <label htmlFor="email">
                  <div className="mb-1">Email Address</div>
                </label>
                <Input
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
                <Input
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
              >
                Need an account? Register here.
              </a>
            </div>
            <div className="my-3">
              <button onClick={send} className="btn btn-secondary">
                Login
              </button>
            </div>
          </div>
        )}
      </Form>
      <div className="mx-3 my-3">
        {isRegister && !isValidEmail && email != "" ? (
          <div className="alert alert-warning" role="alert">
            Invalid email. Please use email issued by the university.
          </div>
        ) : (
          <div></div>
        )}
        {isRegister && !isValidPassword && password != "" ? (
          <div className="alert alert-warning" role="alert">
            Your password should be between 6 and 40 characters.
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Register;
