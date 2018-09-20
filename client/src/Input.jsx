import React, { Component } from 'react';

class Input extends Component {
  
  componentWillMount() {
  }


  constructor(props){
    super(props);
    this.state = {
      counter: 0,
    }
  }


  render() {
    return (
      <div>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name="url_to_shorten"
            placeholder="www.example.com"
          />
        </div>
      </div>
    ); 
  }
}

export default Input;