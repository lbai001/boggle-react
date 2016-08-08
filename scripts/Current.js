import React, {Component} from 'react';
import Score from './Score'


export default class Current extends Component {
render() {
	console.log(this.props)
    return (
    	<div>
    	<p>Current Word: {this.props.clickedWord} </p>
    	</div>
    );
  }
}