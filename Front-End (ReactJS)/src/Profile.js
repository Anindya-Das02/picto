import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_data: '',
            isLoaded: false,
            posts: '',
            has_no_posts: false
        }
    }

    componentDidMount = async () => {
        var res = await fetch("http://localhost:9090/picto/profile.php?status=true&user_id=" + Cookies.get("user_id"));
        var res = await res.json();
        this.setState({
            profile_data: res[0],
            isLoaded: true,
            posts: res[1]
        });
        if (res[1].length === 0) {
            this.setState({
                has_no_posts: true
            })
        }
        // console.log(res[0]);
        // console.log(res[1]);
    }

    redirectToSettings = () => {
        window.location.href = "/settings";
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div className="profile-content">
                    <div className="row row-item">
                        <div className="col-sm-4">
                            <center>
                                <img src={this.state.profile_data.profile_pic} style={{ width: '100%' }} />
                            </center>
                        </div>
                        <div className="col-sm-8">
                            <div style={{ minHeight: '190px' }}>
                                <h2>{this.state.profile_data.username} <span style={{float:'right'}}><button className="btn btn-default" title="Edit profile" onClick={this.redirectToSettings} ><i className="fa fa-cog" aria-hidden="true"></i></button></span> </h2>
                                {this.state.profile_data.caption}
                            </div>
                        </div>
                    </div>
                    <div className="myposts">
                        <center>
                            <h3 style={{ color: 'white' }}>My Posts</h3>
                        </center>
                        {this.state.has_no_posts ? <MyPosts no_post={true} /> : (this.state.posts.map((post, index) => <MyPosts key={index} post={post} />))}
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

class MyPosts extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.no_post) {
            return (
                <div>
                    <center>
                        <p style={{ color: 'white' }}>such emptiness</p>
                    </center>
                </div>
            );
        }
        else {
            return (
                <div className="mypost-item">
                    <div className="row row-item">
                        <div className="col-sm-4">
                            <center>
                                <img src={this.props.post.pic_src} style={{ width: '100%' }} />
                            </center>
                        </div>
                        <div className="col-sm-8">
                            <h3>{this.props.post.title}</h3>
                            <h5>Likes: {this.props.post.likes}</h5>
                            <h5>Post Date: {this.props.post.post_date}</h5>
                            <p>
                                {this.props.post.caption}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default Profile;