import React, {Component} from 'react';
import Score from './Score'

const styles = {
	span:{
		fontWeight: "bold"
	}
}

export default class Current extends Component {
render() {
	console.log(this.props)
    return (
    	<div>
    	<p><span style={styles.span}>Current Word:</span> {this.props.clickedWord} </p>
    	</div>
    );
  }
}