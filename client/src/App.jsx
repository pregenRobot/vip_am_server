import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Switch, Route } from "react-router-dom";

import CommitWork from "./components/commit-work.component";
import UploadWork from "./components/upload-work.component";
import Register from "./components/register-auth.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/work" className="navbar-brand ms-3">
            Dolphin Acoustics AM
          </a>
          <div className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to={"/work"} className="nav-link">
                View
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/work/commit"} className="nav-link">
                Commit
              </Link>
            </li>
            <li>
              <Link to={"/work/upload"} className="nav-link">
                Upload
              </Link>
            </li>
          </div>
          <div className="navbar-nav ms-auto me-3">
            <li className="nav-item">
              <Link to={"/work/auth"}>
                <button type="button" className="btn btn-primary">
                  Authenticate
                </button>
              </Link>
            </li>
          </div>
        </nav>

        <div className="containter mt-3">
          <Switch>
            {/* <Route exact path={["/","/work"]} component={WorkList} /> */}
            <Route exact path="/work/commit" component={CommitWork} />
            <Route exact path="/work/upload" component={UploadWork} />
            {/* <Route exact path="/work/:hash" component={Work} /> */}
            <Route exact path="/work/auth" component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
