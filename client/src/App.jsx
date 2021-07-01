import React, {Component} from "react"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, Switch, Route} from 'react-router-dom';

import CommitWork from "./components/commit-work.component"
import UploadWork from "./components/upload-work.component"

class App extends Component{
  render(){
    
    return (
      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/work" className="navbar-brand">
      Dolphin Acoustics AM
      </a>
      <div className ="navbar-nav mr-auto">
      <li className="nav-item">
      <Link to={"/work"} className="nav-link">
      View
      </Link>
      </li>
      <li className="nav-item">
      <Link to={"/work/commit"} className="nav-link">
      Commit
      </Link>
      <Link to={"/work/upload"} className="nav-link">
      Upload
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
      </Switch>
      </div>
      </div>
      );
    }
  }
  
  export default App;
  