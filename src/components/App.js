import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css';

import responses from './responses.json';

let allMesgs = [];

class App extends Component {
  state = { allMesgs:[] }

  componentWillMount() {
    this.setState({ responses });
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  sendMesg() {
    ReactDOM.findDOMNode(this.text).value = '';
    let responses = this.state.responses;
    let message = this.state.message;
    allMesgs.push({class:'send', message});
    let match = false;
    let response = 'response';
    for (let keyWord in responses) {
      if (keyWord === message) {
        match = true;
        response = responses[keyWord];
        allMesgs.push({class:'response', message:response});
        break;
      }
    }
    if (!match) {
      allMesgs.push({class:'response', message:"Sorry, I don't understand that command"});
    }
    // this.setState({ match, response, allMesgs },() => {
    //   console.log(this.state)
    // });
    this.setState({ match, response, allMesgs });
  }

  renderAllMesgs() {
    let messages = this.state.allMesgs;

    return(
      messages.map(message =>
        <div key={Math.random()*Math.random()}>
          <div className={message.class}>
            <span>{message.message}</span>
          </div>
          <div className='clear'></div>
        </div>
    ))
  }

  render() {
    return (
      <div className="App">
        <div className='content chatWindow' id='chatWindow'>
          {this.renderAllMesgs()}
          <div ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
        <div className='content typing'>
          <textarea
            ref={(el) => { this.text = el; }}
            name='message'
            placeholder='Try key words: proposal, title, detail'
            onChange={this.handleChange.bind(this)}></textarea>
        </div>
        <div className='content sending'>
          <button name='send' className='primaryBtn' onClick={()=>this.sendMesg()}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
