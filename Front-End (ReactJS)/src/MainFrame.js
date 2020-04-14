import React, { Component } from 'react';
import ImageFrame from './ImageFrame';
import Cookies from 'js-cookie';

/*
Get feed from PHP server.
It has the following structure 
feed = {
post_id, posted_by, title, date, pic_src, caption, likes, like_status
}
*/

class MainFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: '',
            isLoaded: false
        }
    }

    componentDidMount = async () => {
        setInterval(async () => {
            // if cookies are set -> load feed with user
            if (Object.keys(Cookies.get()).length !== 0) {
                var res = await fetch("http://localhost:9090/picto/feed.php?login_status=true&uid=" + Cookies.get("user_id"));
                var feed = await res.json();
            }
            else {
                var res = await fetch("http://localhost:9090/picto/feed.php?login_status=false");
                var feed = await res.json();
            }
            this.setState({
                feed: feed,
                isLoaded: true
            });
        }, 1000);

    }


    render() {
        // console.log("render function---");
        // console.log(this.props.status_data); //working
        if (this.state.isLoaded) {
            return (
                <div className="mainFrame-content">
                    {this.state.feed.map((data,index) => <ImageFrame key={index} feed={data} />)}
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

export default MainFrame;