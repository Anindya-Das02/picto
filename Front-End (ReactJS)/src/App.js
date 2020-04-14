import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from './Profile';
import MainFrame from './MainFrame';
import Login from './Login';
import NavBar from './NavBar';
import Cookies from 'js-cookie'
import NewPost from './NewPost';
import Settings from './Settings';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status_data: ''
    }
  }


  render() {
    return (
      <div className="contents">
        <NavBar status_data={this.state.status_data} />
        <div className="container">
          <div className="page-content">
            <Router>
              <Switch>
                <Route path="/" exact component={MainFrame} />
                <Route path="/profile" exact render={() => (
                  Object.keys(Cookies.get()).length ? <Profile /> : <Login />
                )} />
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/newpost" exact render={()=>(
                  Object.keys(Cookies.get()).length ? <NewPost /> : <Login/>
                )} />
                <Route path="/settings" exact component={Settings} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function PageNotFound() {
  return (
    <div className="page-not-found-error">
      <center>
        <i class="fa fa-frown-o" aria-hidden="true" style={{color:'white',fontSize:'150px'}}></i>
        <h1 style={{ color: 'white' }}>Error 404</h1>
        <h3 style={{ color: 'white' }}>The requested webpage does not exists</h3>
        <hr />
      </center>
    </div>
  );
}

function Logout(){
  Cookies.remove("user_id",{path:'/'});
  Cookies.remove("username",{path:'/'});
  setTimeout(() => {
    window.location.href = '/';          
  }, 800);
  return(
    <div>
      <center>
        <h3 style={{color:'white'}}>logging out...</h3>
      </center>
    </div>
  );
}

export default App;
