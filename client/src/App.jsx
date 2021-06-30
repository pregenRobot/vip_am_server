import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link, Switch} from 'react-router-dom';


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bd-dark">
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
            <Link to={"/work/upload"} className="nav-link">
              Commit
            </Link>
          </li>
        </div>
      </nav>

      <div className="containter mt-3">
        <Switch>
          <Route exact path={["/","/work"]} component={WorkList} />
          <Route exact path="/work/upload" component={AddWork} />
          <Route exact path="/work/:hash" component={Work} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
