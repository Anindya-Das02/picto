import React, { Component } from 'react';
import Cookies from 'js-cookie';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "https://cdn.discordapp.com/attachments/693725640683421707/699637589820571699/no-image-icon-23492.png"
        }
    }

    selectImage = (event) => {
        let file = event.target.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
                src: reader.result
            });
            //console.log(reader.result);
        }
        reader.readAsDataURL(file);
    }

    uploadNewPost = async () => {
        let title = document.getElementById("post_title").value.trim();
        let caption = document.getElementById("post_caption").value;
        let img_src = this.state.src;
        if (title.length !== 0) {
            var data = {
                user_id: Cookies.get("user_id"),
                title: title,
                caption: caption,
                src: encodeURI(img_src)
            }
            var http = new XMLHttpRequest();
            var url = "http://localhost:9090/picto/addnewpost.php";
            var params = "response=true&data=" + JSON.stringify(data);
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send(params);
            http.onreadystatechange = () => {
                if (http.readyState === 4 && http.status === 200){
                    console.log(http.responseText);
                    window.location.href = '/profile';
                }
            }
        } else {
            alert("invalid title");
        }

    }

    discardPost = () => {
        window.location.href = '/';
    }

    render() {
        return (
            <div>
                <h1 align="center" style={{ color: 'white' }}>Add new post</h1>
                <div className="row newpost">
                    <div className="col-sm-5">
                        <center>
                            <img src={this.state.src} alt="post image" style={{ maxWidth: '100%' }} />
                            <p></p>
                        </center>
                    </div>
                    <div className="col-sm-7">
                        <input style={{ display: 'none' }} type="file" accept="image/*" ref={fileInput => this.fileInput = fileInput} onChange={this.selectImage} />
                        <center>
                            <button className="btn btn-default" onClick={() => this.fileInput.click()}>select photo</button>
                        </center>
                        <h5>Enter title:</h5>
                        <input className="form form-control" id="post_title" type="text" placeholder="An Interesting Title" /><br />
                        <h5>Enter caption:</h5>
                        <textarea className="form form-control caption_area" id="post_caption" style={{width:'100%'}} placeholder="Write a Beautiful Caption"></textarea><br />
                        <button className="btn btn-primary" onClick={this.uploadNewPost}>Upload</button> &nbsp;
                        <button className="btn btn-danger" onClick={this.discardPost}>Discard</button>

                    </div>
                </div>


            </div>
        );
    }
}

export default NewPost;