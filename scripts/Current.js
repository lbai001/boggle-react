import React, {Component} from 'react';

export default class Current extends Component {

render() {
	console.log(this.props)
    return (
    	<div>
    	<p>current word: {this.props.clickedWord} </p>
    	</div>
    );
  }
}