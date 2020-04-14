import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: '',
            caption: '',
            profile_pic_selected: false,
            src: '',
            username : '',
            email: ''
        }
    }

    componentDidMount = async () => {
        var response = await fetch("http://localhost:9090/picto/getuserdetails.php?response=true&user_id=" + Cookies.get("user_id"));
        var data = await response.json();
        console.log(data);
        //var s = data.pic_src;
        this.setState({
            loaded: true,
            data: data,
            src: data.pic_src,
            username: data.username,
            email: data.email_id,
            caption: data.caption
        })
    }


    selectFileHandler = (event) => {
        let file = event.target.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
                profile_pic_selected: true,
                src: reader.result
            });
            //console.log(reader.result);
        }
        reader.readAsDataURL(file);
    }

    updateUserProfile = async () => {
        let username = document.getElementById("edt_user_name").value.trim();
        let email = document.getElementById("edt_email_id").value;
        let caption = document.getElementById("edt_caption").value;
        let img_src = this.state.src;

        if (username.length >= 3) {
            var new_profile_data = {
                user_id: Cookies.get("user_id"),
                username: username,
                email_id: email,
                caption: caption,
                pic_src: encodeURI(img_src)
            }

            //console.log(JSON.stringify(new_profile_data));

            var http = new XMLHttpRequest();
            var url = "http://localhost:9090/picto/updateuserdetails.php";
            var params = "response=true&data=" + JSON.stringify(new_profile_data);
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send(params);
            http.onreadystatechange = () => {
                if (http.readyState == 4 && http.status == 200) {
                    console.log(http.responseText);
                    window.location.href = '/profile';
                }
            }
        }
        else {
            alert("invalid")
        }
    }

    usernameHandler = (e) => {
        this.setState({
           username: e.target.value
        })
    }

    emailHandler = (e) =>{
        this.setState({
            email: e.target.value
        });
    }

    captionHandler = (e) => {
        this.setState({
            caption: e.target.value
        });
    }

    render() {
        if (this.state.loaded) {
            return (
                <div className="setting-content">
                    <h2 align="center" style={{ color: 'white' }}>Settings</h2>
                    <div className="row newpost">
                        <div className="col-sm-5">
                            <center>
                                <img src={this.state.src} style={{ maxWidth: '100%' }} />
                                <p></p>
                            </center>
                        </div>
                        <div className="col-sm-7">
                            <input style={{ display: 'none' }} type="file" accept="image/*" ref={fileInput => this.fileInput = fileInput} onChange={this.selectFileHandler} />
                            <center>
                                <button className="btn btn-default" onClick={() => this.fileInput.click()}>select photo</button>
                            </center>
                            <h5><b>Edit username:</b></h5>
                            <input type="text" id="edt_user_name" className="form form-control" placeholder="Edit username" value={this.state.username} onChange={this.usernameHandler} />
                            <h5><b>Edit email-id:</b></h5>
                            <input type="email" id="edt_email_id" className="form form-control" placeholder="edit email id" value={this.state.email} onChange={this.emailHandler}/>
                            <h5><b>Edit caption:</b></h5>
                            <textarea id="edt_caption" className="form form-control caption_area" style={{width:'100%'}} value={this.state.caption} onChange={this.captionHandler} ></textarea><br/>
                            <button className="btn btn-success" onClick={this.updateUserProfile}>Save Changes</button>&nbsp;
                            <button className="btn btn-danger" onClick={()=>{
                                window.location.href = '/profile';
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h3 align='center' style={{ color: 'white' }}>loading...</h3>
                </div>
            );
        }


    }
}

export default Settings;