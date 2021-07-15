import React, { useState, useRef, useContext } from "react";
import AuthDataService from "../services/auth.service";

import { isEmail } from "validator";

const defaults = {
  email: {
    alertType: "warning",
    text: "Please add an email issued by the University of St Andrews",
  },
  password: {
    alertType: "warning",
    text: "Please add a password between 6 and 40 characters",
  },
  name: {
    alertType: "warning",
    text: "Please add your name",
  },
  status: {
    alertType: "warning",
    text: "Please state your year of study if you are a student or select Faculty if you are a staff member",
  },
};
function Register() {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState(
    Object.getOwnPropertyNames(defaults).map((prop) => {
      return {
        type: prop,
        text: defaults[prop].text,
        alertType: defaults[prop].alertType,
      };
    })
  );

  const send = (event) => {
    event.preventDefault();
    //Send first time registration

    if (isRegister) {
      if (messages.length > 0) {
        console.log("message length is not 0");
        return;
      } else {
        AuthDataService.register({
          userName: name,
          email: email,
          password: password,
          userStatus: status,
        })
          .then((response) => {
            console.log(response);
            addMessage({
              type: "register",
              text: response.data.message,
              alertType: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            addMessage({
              type: "register",
              text: error.response.data.message,
              alertType: "danger",
            });
          });
      }
    } else {
      AuthDataService.login({
        email: email,
        password: password,
      })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.accessToken);

          alert("You have logged in successfully.");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  const createMessages = () => {
    return messages.map((item) => {
      return (
        <div className={`alert alert-${item.alertType}`} key={item.type}>
          {item.text}
        </div>
      );
    });
  };

  const removeMessage = (type) => {
    setMessages(
      messages.filter((item) => {
        return item.type !== type && item.type !== "register";
      })
    );
  };

  const addMessage = (message) => {
    console.log(messages);
    // messages.push({ type: type, message: message });
    setMessages((previousMessages) => [...previousMessages, message]);
  };

  const messageExists = (type) => {
    return messages.some((item) => {
      // console.log(item.type);
      return item.type === type;
    });
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
                      removeMessage("email");
                    } else {
                      if (!messageExists("email")) {
                        addMessage({ type: "email", ...defaults.email });
                      }
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
                      removeMessage("password");
                    } else {
                      if (!messageExists("password")) {
                        addMessage({ type: "password", ...defaults.password });
                      }
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
                      removeMessage("name");
                    } else {
                      if (!messageExists("name")) {
                        addMessage({ type: "name", ...defaults.name });
                      }
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
                  id="status"
                  type="text"
                  onChange={(event) => {
                    const { value } = event.target;
                    setStatus(value);
                    if (value !== "--Select one--") {
                      removeMessage("status");
                    } else {
                      if (!messageExists("status")) {
                        addMessage({ type: "status", ...defaults.status });
                      }
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
        {isRegister ? createMessages() : <div></div>}
      </div>
    </div>
  );
}

export default Register;
