import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Score from './Score'
import Current from './Current'
console.log(Button)

export default class Board extends Component {


 constructor (props) {
		super(props);
  		let completeboard=this.createRows(this.formatLetters(this.createButtons(this.diceGenarator())))
		this.state = {
			item:"",
			board: completeboard
		}
	}


 
 diceGenarator () {  	
  	let dice=["aaafrs","aaeeee","aafirs","adennn","aeeeem","aeegmu","aegmnn","afirsy","bjkqxz","ccenst","ceiilt","ceilpt","ceipst","ddhnot","dhhlor","dhlnor","dhlnor","eiiitt","emottt","ensssu","fiprsy","gorrvw","iprrry","nootuw","ooottuS"]
  	let holder=[]
  	let randomLetter=Math.floor(Math.random()*6)
  	let indexes=dice.length;
  	let start=0
  	let result=[]
  	while(indexes--){
  		start=Math.floor(Math.random()*(indexes+1))
  		holder.push(dice[start])
  		dice.splice(start,1)
  	}

  	console.log("hi i'm holder", holder)
  	for(let i=0;i<holder.length;i++){
  			result.push(holder[i][randomLetter])
  		
  	}
  	console.log(result);
  	return result;
  }

 formatLetters (array) {
  	let holder=[[], [], [], [], []]
  	let counter=0
  
  for(let i = 0; i < array.length; i++) {
    holder[counter].push(array[i]);
    if(holder[counter].length === 5) {
      counter++;
    }
  }
   console.log(holder);
   return holder;
 }

 createRows (array) {
 	return (array).map((elem) => {
 		return (
 			<div>
 			{elem}
 			<br/>
 			</div>
 		)
 	});
 }

 onItemClick(item) {
 	console.log(this.state)
 	let newWord = this.state.item += item;
 	this.setState({
 		item: newWord
 	})
  }


 createButtons (array) {
 	return (array).map((elem) => {
 		let boundItemClick = this.onItemClick.bind(this, elem);

 		return(
		<button onClick={boundItemClick}>{elem}</button>		
		)
 	})
 }
  render() {
    return (      
      <div>
      <h1>I am board!</h1>
      {this.state.board}
      <Current clickedWord={this.state.item}/>
      <Score/>

      </div>

    );
  }
}
