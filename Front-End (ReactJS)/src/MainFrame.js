import React, { Component } from 'react';
import ImageFrame from './ImageFrame';
import Cookies from 'js-cookie';
import LoadingBuffer from './LoadingBuffer';
import ad from './ad.png';
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
            isLoaded: false,
            content_count: 3,
            total_feed_count: '',
            load_more_req: true
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount = async () => {

        var feed_count = await fetch("http://localhost:9090/picto/getfeedcount.php?response=true");
        var count_result = await feed_count.text();
        this.setState({
            total_feed_count: count_result
        });

        setInterval(async () => {
            // if cookies are set -> load feed with user
            if (Object.keys(Cookies.get()).length !== 0) {
                var res = await fetch("http://localhost:9090/picto/feed.php?login_status=true&cc=" + this.state.content_count + "&uid=" + Cookies.get("user_id"));
                var feed = await res.json();
            }
            else {
                var res = await fetch("http://localhost:9090/picto/feed.php?login_status=false&cc=" + this.state.content_count);
                var feed = await res.json();
            }
            this.setState({
                feed: feed,
                isLoaded: true
            });
        }, 1000);

        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);
        //bottom reached
        if (windowBottom >= docHeight) {
            this.eventFired()
        }
    }

    eventFired = () => {
        //console.log("event fired")
        this.setState({
            content_count: this.state.content_count + 3
        });
        //console.log(this.state.content_count);
        if (this.state.content_count >= this.state.total_feed_count) {
            this.setState({
                load_more_req: false
            });
        }
    }


    render() {
        // console.log("render function---");
        // console.log(this.props.status_data); //working
        if (this.state.isLoaded) {
            return (
                <div className="mainFrame-content">
                    <div className="row">
                        <div className="col-sm-7  outer-box1" >
                            {this.state.feed.map((data, index) => <ImageFrame key={index} feed={data} />)}
                            <div className="load-more-buffer">
                                {this.state.load_more_req ? (
                                    <center>
                                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ color: 'white', fontSize: '20px', margin: '13px' }}></i>
                                    </center>
                                ) : <div></div>}
                            </div>
                        </div>
                        <div className="col-sm-5 outer-box2 adds">
                            <div className="inner-box2">

                            </div>
                        </div>

                    </div>
                </div>
            );
        }
        else {
            return (
                <LoadingBuffer />
            );
        }

    }
}

export default MainFrame;