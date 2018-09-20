import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class App extends Component {
  
  componentWillMount() {
  }


  handleSubmit = () => {

    axios.post('/api/shorten', {
      url_to_shorten: this.state.url_to_shorten
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  constructor(props){
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <div>
        <Form />
      </div>
    ); 
  }
}

export default App;