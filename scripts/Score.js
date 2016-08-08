import React, {Component} from 'react';


export default class Score extends Component {


  render() {
  	console.log('inscore',this.props)
  	let r=this.props.words.map(function(v){
  		return(<tr><td>{v}</td><td>{this.props.currenttotal}</td></tr>)
  	}.bind(this));

	return (
<table>
  <thead>
    <tr>
      <th>Word</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody>
  	{r}
	<tr>
      <td>total</td>
      <td>{this.props.total}</td>
    </tr>
  </tbody>
</table>
    );
  }
}
