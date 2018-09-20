import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class App extends Component {
  
  componentWillMount() {
  }

  constructor(props){
    super(props);
    this.state = {
      counter: 0,
    }
  }

  handleClick = () => {
    this.setState({counter: this.state.counter+ 1});
    this.render()
  }


  render() {
    return (
      <div>
        <h1>HELLO</h1>
      </div>
    ); 
  }
}

export default App;