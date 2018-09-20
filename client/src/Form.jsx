import React, {Component} from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';

class Form extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      }
  }

  handleClick = () => {
    this.setState({});
    this.render()
  }
  
  render(){
    return (
      <div>
        <form className="form-group" onSubmit={this.handleSubmit} />
          <Input/>
          <Button/>
      </div>
    );
  }
}
export default Form;