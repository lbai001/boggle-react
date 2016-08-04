import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Score from './Score'
import Current from './Current'
console.log(Button)

export default class Board extends Component {


 constructor (props) {
		super(props);
		let objectBoard=this.formatLetters(this.diceGenarator())
  	let completeboard=this.createRows(this.createButtons(objectBoard))
		this.state = {
			item:"",
			lastitem:null,
			board: completeboard,
			objectBoard: objectBoard
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
  			result.push({key: holder[i][randomLetter]})
  		
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

 onItemClick (item) {
    console.log(item)
    let currentletter=item.key
    this.setState({
      item: this.state.item+=currentletter,
      lastitem: item
    })
    console.log(this.state.lastitem)
    if(this.state.currentitem!==this.state.item.charAt(0)){
      if(this.validChoice(item)===false){
        console.log('ifif is hitting', this.state.lastitem.key)
        this.setState({
          item: this.state.item.slice(item.key, -1),
          lastitem: this.state.lastitem
        })
      }
    }
 	}
 
  createButtons (array) {
 	return array.map((arr) => {
 		return (arr).map((elem) => {

 			return(
			<button color='red' onClick={this.onItemClick.bind(this, elem)}>{elem.key}</button>		
			)
 		})	
 	})
 }

 getLocation (array,item) {
 	console.log("in currentlo",item)
 	for(var i=0;i<array.length;i++){
 		var currentRow=array[i]
 		var currentRowNum=i
 		if(currentRow.indexOf(item)!==-1){
 			return {row: currentRowNum, index: currentRow.indexOf(item)}
 		}
 	}
 }

 validChoice (item) {
 	var flag=true
  let current=this.getLocation(this.state.objectBoard, this.state.lastitem)
  let last=this.getLocation(this.state.objectBoard, item)
  console.log("current location", current)
  console.log("last location", last)
 	if((current.index-last.index)!==1 && (last.index-current.index)!==1 && (current.row-last.row)!==1 && (last.row-current.row)!==-1){
 		flag = false
 	}else{
 		flag = true
 	}
  return flag
	}

  render () {
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
