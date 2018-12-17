import React, { Component } from 'react';
import ListContainer from "../components/ListContainer";
import "../styles/style.css";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Currency App</h1>
          <ListContainer />
      </div>
    );
  }
}

export default Home;
