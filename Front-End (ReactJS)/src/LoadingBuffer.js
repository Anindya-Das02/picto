import React, { Component } from 'react';


class LoadingBuffer extends Component {
    render() {
        return (
            <div style={{ lineHeight: '90vh' }}>
                <center>
                    <div style={{ verticalAlign: 'middle' }}>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ color: 'white' }}></i>
                    </div>
                </center>
            </div>
        );
    }
}

export default LoadingBuffer;