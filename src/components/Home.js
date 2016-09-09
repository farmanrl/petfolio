import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}>
        <img style={{width: "50%"}}
             src="http://i.imgur.com/HcCeSUu.png"/>
      </div>
    );
  }
}
