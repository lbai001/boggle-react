import React, {Component} from 'react';

export default class Buttons extends Component {

render() {
    return (
    	<div>
    	<p>current word: {this.props.clickedWord} </p>
    	</div>
    );
  }
}