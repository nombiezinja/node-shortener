import React, { Component } from 'react';

class Button extends Component {
  
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
        <button type="submit" className="btn btn-lg btn-primary btn-block">
          Shorten
        </button>
      </div>
    ); 
  }
}

export default Button;