import React, { Component } from 'react';
import Cookies from 'js-cookie';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signing_in: true,
            incorrect_auth_msg: false,
            err_msg: false,
            pass_entered: false,
            is_pass_same: false
        }
    }

    loginHanldler = async (e) => {
        e.preventDefault();
        let username = document.getElementById("form_user_name").value.trim();
        let password = document.getElementById("form_user_password").value.trim();
        if (username.length !== 0 && password.length !== 0) {
            var http = new XMLHttpRequest();
            var url = "http://localhost:9090/picto/login.php";
            //check if the input is email
            if (username.includes('@')) {
                var params = `response=true&type=email&username=${encodeURI(username)}&password=${encodeURI(password)}`;
            }
            //the user input is username
            else {
                var params = `response=true&type=username&username=${encodeURI(username)}&password=${encodeURI(password)}`;
            }
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send(params);
            http.onreadystatechange = () => {
                if (http.readyState === 4 && http.status === 200) {
                    var response_result = http.responseText;
                    console.log(response_result);
                    if (response_result === "unauthorized user") {
                        this.setState({
                            err_msg: true
                        });
                    }
                    else {
                        console.log(JSON.parse(http.responseText));
                        var response_data = JSON.parse(http.responseText);
                        Cookies.set("user_id", response_data.user_id, { path: '/' });
                        Cookies.set("username", response_data.username, { parh: '/' });
                        window.location.href = '/';
                    }
                }
            }
        }
        else {
            this.setState({
                err_msg: true
            });
        }
    }

    signupHandler = async (e) => {
        e.preventDefault();
        let username = document.getElementById("form_user_name_sup").value.trim();
        let email_id = document.getElementById("form_user_email").value.trim();
        let password = document.getElementById("form_user_re_password_sup").value;

        if (username.length !== 0) {
            var http = new XMLHttpRequest();
            var url = "http://localhost:9090/picto/signup.php";
            var params = `response=true&username=${encodeURI(username)}&email_id=${encodeURI(email_id)}&password=${password}`;
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send(params);
            http.onreadystatechange = () => {
                if (http.readyState === 4 && http.status === 200) {
                    var signed_up = JSON.parse(http.responseText);
                    if (signed_up.status === "done") {
                        let res_user_id = signed_up.user_id;
                        let res_username = signed_up.username;
                        Cookies.set("user_id", res_user_id, { path: '/' });
                        Cookies.set("username", res_username, { path: '/' });
                        window.location.href = '/';
                    }
                }
            }
        }
        else{
            alert("invalid credentials");
        }
    }

    checkPassword = () => {
        let pass1 = document.getElementById("form_user_password_sup").value;
        let pass2 = document.getElementById("form_user_re_password_sup").value;
        if (pass2.length !== 0) {
            if (pass1 === pass2) {
                this.setState({
                    pass_entered: true,
                    is_pass_same: true
                });
            }
            else {
                this.setState({
                    pass_entered: true,
                    is_pass_same: false
                });
            }
        }
    }

    render() {
        if (this.state.signing_in) {
            return (
                <div className="login-content">
                    <h2 style={{ color: 'white' }} align="center"> Sign-in</h2>
                    <div className="login-div">
                        {this.state.err_msg ? <h6 align="center" style={{ color: 'red' }}>invalid credentials</h6> : <h6></h6>}
                        <form className="form-block" onSubmit={this.loginHanldler}>
                            <h5 align="left"><b>User name:</b></h5>
                            <input type="text" className="form form-control form-cust-style" placeholder="username or email" id="form_user_name" autoFocus required /><br />
                            <h5 align="left"><b>Password:</b></h5>
                            <input type="password" className="form form-control form-cust-style" placeholder="password" id="form_user_password" required /><br />
                            <input type="submit" className="btn btn-success" value="sign-in" />
                        </form>
                    </div>
                    <br />
                    <center>
                        <p style={{ color: 'white' }}>First time ? <button className="btn btn-link" onClick={() => {
                            this.setState({
                                signing_in: false
                            });
                        }}>Create a New Account</button> </p>
                    </center>

                </div>
            );
        }
        else {
            return (
                <div className="new-user-content">
                    <h1 align="center" style={{ color: 'white' }}>Sign-up</h1>
                    <div className="login-div" style={{ height: 'auto', paddingBottom: '15px' }}>
                        <form className="form-block" onSubmit={this.signupHandler}>
                            <h5 align="left"><b>Pick an username:</b></h5>
                            <input type="text" className="form form-control form-cust-style" pattern="[a-z A-Z0-9_.]{3,}" placeholder="enter username" title="Atleast 3+ characters; can have _ ." id="form_user_name_sup" autoFocus required /><br />
                            <h5 align="left"><b>Enter email id:</b></h5>
                            <input type="email" className="form form-control form-cust-style" placeholder="enter email id" id="form_user_email" required /><br />
                            <h5 align="left"><b>Enter Password:</b></h5>
                            <input type="password" className="form form-control form-cust-style" pattern=".{4,}" title="Password should be atleast 4 char long" placeholder="enter password" id="form_user_password_sup" onChange={this.checkPassword} required /><br />
                            <h5 align="left"><b>Confirm Password:</b></h5>
                            <input type="password" className="form form-control form-cust-style" placeholder="retype password" id="form_user_re_password_sup" onChange={this.checkPassword} required /><br />
                            {this.state.pass_entered ? (
                                this.state.is_pass_same ? <h6 align="center" style={{ color: 'green' }}>Password Matching</h6> : <h6 align="center" style={{ color: 'red' }}>Password Not Matching</h6>
                            ) : <h6></h6>}
                            <input type="submit" className="btn btn-success" value="sign-up" />
                        </form>
                    </div>
                    <br />
                    <center>
                        <p style={{ color: 'white' }}>
                            Already have an account? <button className="btn btn-link" onClick={() => {
                                this.setState({
                                    signing_in: true
                                })
                            }}>Sign-in</button>
                        </p>
                    </center>
                </div>
            );
        }
    }
}

export default Login;
