import React, { Component } from 'react';
import Cookies from 'js-cookie';

/*
Get feed from MainFrame.
feed : JSON
It has the following structure 
feed = {
post_id, posted_by, title, date, pic_src, caption, likes, like_status
}
*/

class ImageFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false
        }
    }

    recordLike = () => {
        // check if user is logged in -> check if cookies are set
        // if cookies not set -> do not inc/dec likes 
        if (Object.keys(Cookies.get()).length !== 0) {
            var http = new XMLHttpRequest();

            //inc_likes
            // post not liked -> inc the like on post
            //on like btn pressed -> change btn state
            if (this.props.feed.like_status === 0) {
                console.log("inc likes +1")
                let new_likes = parseInt(this.props.feed.likes) + 1;
                var data = {
                    newLikes: new_likes,
                    post_id: this.props.feed.post_id,
                    posted_by: this.props.feed.posted_by,
                    liked_by: Cookies.get("user_id")
                }
                var params = "inc_like=true&data=" + JSON.stringify(data);
                this.setState({
                    isLiked: true
                });
            }

            //dec_likes
            //post already liked by user -> dec the like on post
            //on btn pressed -> change btn state
            else {
                console.log("dec likes -1");
                let new_likes = parseInt(this.props.feed.likes) - 1;
                var data = {
                    newLikes: new_likes,
                    post_id: this.props.feed.post_id,
                    posted_by: this.props.feed.posted_by,
                    liked_by: Cookies.get("user_id")
                }
                var params = "dec_like=true&data=" + JSON.stringify(data);
                this.setState({
                    isLiked: false
                });
            }
            var url = "http://localhost:9090/picto/recordLike.php";
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send(params);
            http.onreadystatechange = function () {
                if (http.readyState === 4 && http.status === 200) {
                    console.log(http.responseText);
                }
            }
        }
        //if user is not logged-in
        else {
            alert("please log-in");
        }
    }

    componentDidMount = () => {
        if (this.props.feed.like_status === 1) {
            //console.log("mounted")
            this.setState({
                isLiked: true
            });
        }
    }




    render() {
        if (this.state.dummy) {
            return (
                <div>
                    <h1>login dear</h1>
                </div>
            );
        }
        else {
            return (
                <div className="inner-box1">
                    <div className="image-holder">
                        <center>
                            <img src={this.props.feed.pic_src} className="img-style" />
                        </center>
                    </div>
                    <div className="caption-box">
                        <div className="caption-header">
                            <h2>{this.props.feed.title}</h2>
                            <p>
                                <i>by <a href="#">{this.props.feed.posted_by}</a> </i>
                            </p>
                        </div>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><button className="btn" onClick={this.recordLike} style={{ backgroundColor: 'transparent' }}> {this.state.isLiked ? <i className="fa fa-thumbs-up" aria-hidden="true" title="un-like" style={{ fontSize: '20px' }}></i> : <i className="fa fa-thumbs-o-up" title="like" aria-hidden="true" style={{ fontSize: '20px' }}></i>} </button></td>
                                        <td> {this.props.feed.likes} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="caption-body">
                            {this.props.feed.caption}
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default ImageFrame;