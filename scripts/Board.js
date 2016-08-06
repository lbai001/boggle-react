import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Score from './Score'
import Current from './Current'

const styles = {
  Button: {
    width: 50,
    height: 50,
    margin: 5,
    background:'white'
  },
  ButtonActive: {
    width: 50,
    height: 50,
    margin: 5,
    background:'blue'
  },
  ButtonDeactive: {
    width: 50,
    height: 50,
    margin: 5,
    background:'red'
  }
};

export default class Board extends Component {
 constructor (props) {
		super(props);
    this.state = {
      item:"",
      clicked:[],
      board: null,
      objectBoard: null,
      css: styles.Button,
      activeCss: styles.ButtonActive
    }
  }

  componentWillMount() {
		let objectBoard=this.formatLetters(this.diceGenarator())
  	let completeBoard=this.createRows(this.createButtons(objectBoard))
    this.setState({
      board: completeBoard,
      objectBoard: objectBoard
    })
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
  			holder[i]=holder[i].toUpperCase()
        result.push({key: holder[i][randomLetter]})
  		}
    for(var i=0;i<result.length;i++){
      if(result[i].key==="Q"){
        result[i].key+="u"
      }
    }
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
  var currentitem=this.getLocation(this.state.objectBoard,item)
  console.log(this.state.clicked);
  var previtem=this.getLocation(this.state.objectBoard, this.state.clicked[this.state.clicked.length - 1])
  if(this.state.clicked.indexOf(item)===-1){
    if(this.state.clicked.length === 0){
      this.state.clicked.push(item)
      this.setState({
        item: this.state.item+=item.key
      })
    } else if((Math.abs(currentitem.row - previtem.row)===0 || Math.abs(currentitem.row - previtem.row)===1) && (Math.abs(currentitem.index - previtem.index)===0 || Math.abs(currentitem.index - previtem.index)===1)){
        this.state.clicked.push(item)
        this.setState({
          item: this.state.item+=item.key
        })
     }
    }else if(this.state.clicked[this.state.clicked.length-1] === item) {
      this.state.clicked.pop()
      this.setState({
        item: this.state.item.substring(0, this.state.clicked.length)
      })
    }
 	}

  cssFilter (elem) {
    console.log(elem)
    console.log(this.state.clicked)
    if(this.state.clicked.indexOf(elem) > -1) {
      return this.state.activeCss
    }else {
    return this.state.css
  }
  }
 
  createButtons (array) {

    return array.map((arr) => {
 		 return (arr).map((elem) => {
        return(
        <Button style={this.state.css} onClick={this.onItemClick.bind(this, elem)}>{elem.key}</Button>
			   )
 		   })	
 	  })
 }
 
 getLocation (array,item) {
 	for(var i=0;i<array.length;i++){
 		var currentRow=array[i]
 		var currentRowNum=i
 		if(currentRow.indexOf(item)!==-1){
 			return {key: item.key, row: currentRowNum, index: currentRow.indexOf(item)}
 		}
 	}
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
