import React, {Component} from 'react';



const styles = {
    row: {
    	 border: "5px solid #FFCA08",
    	 padding: 10,
    	 textalign: "center",
    	 background:"white"
    },
	span:{
		fontWeight: "bold"
	},
	heightlight:{
	 	border: "5px solid #FFCA08",
	 	padding: 10,
	 	textalign: "center",
		background: "#ACCEEC"
	}
};

export default class Score extends Component {
render() {
console.log(this.props.words)
  	let r=this.props.words.map(function(v){
  		return(<tr style={styles.row}><td style={styles.row}>{v.combo}</td><td style={styles.row}>{v.sum}</td></tr>)
  	
  }.bind(this));

	return (
<table>
  <thead>
    <tr style={styles.row}>
      <th style={styles.row}>Word</th>
      <th style={styles.row}>Score</th>
    </tr>
  </thead>
  <tbody>
  	{r}
	<tr style={styles.row}>
      <td style={styles.heightlight}><span style={styles.span}>Total</span></td>
      <td style={styles.heightlight}><span style={styles.span}>{this.props.total}</span></td>
    </tr>
  </tbody>
</table>
    );
  }
}
