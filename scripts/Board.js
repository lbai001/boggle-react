import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Current from './Current';
import Score from'./Score';

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
    background:'#ACCEEC'
  }
};

export default class Board extends Component {
 constructor (props) {
		super(props);
    this.state = {
      item:"",
      clicked:[],
      objectBoard: null,
      css: styles.Button,
      activeCss: styles.ButtonActive,
      storage:[],
      total:0,
      currenttotal:"",
      currentword:""
    }
  }

  componentWillMount() {
		let objectBoard=this.formatLetters(this.diceGenarator())
    this.setState({
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

 onItemClick (item, e) {
  console.log(e.dispatchConfig)
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

  styleButton (elem) {
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
        <Button id="buttons" style={this.styleButton(elem)} onClick={this.onItemClick.bind(this, elem)}>{elem.key}</Button>
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

handleClick () {
  let combo=(this.state.item).toLowerCase();
  let scale={
    1: 10,
    3: 1,
    5: 2,
    6: 3,
    7: 5  
  }
  let sum=0;
  let rows=[];
  for(var i=0;i<data.length;i++){
    if(combo===data[i]){
    if(this.state.storage.indexOf(combo)===-1){
      this.state.storage.push(combo)
      console.log('bitch',this.state.storage)
      this.setState({
        currentword: combo
      },function() {
        console.log(this.state.currentword)
      })
    }
    if(combo.length===1 || combo.length===2){
        sum+=scale[1]
      }
      if(combo.length===3 || combo.length===4){
        sum+=scale[3]
      }
      if(combo.length===5){
        sum+= scale[5]
      }
      if(combo.length===6){
        sum+=scale[6]
      }
      if(combo.length===7){
        sum+= scale[7]
      }
      if(combo.length>8){
        sum+=11
      }

  }

  }
    this.setState({
      storage: this.state.storage,
      item: "",
      clicked: [],
      total: this.state.total+=sum,
      currenttotal: sum
    },function() {
      console.log("after submit",this.state)
    })

}


  
  render () {
    return (      
      <div>
      <h1>BOGGLES!</h1>
      <div id="board">
      {this.createRows(this.createButtons(this.state.objectBoard))}
      </div>
      <div id="submit">
      <button onClick={this.handleClick.bind(this)}>Submit</button>
      </div>
      <div id="currentword">
      <Current clickedWord={this.state.item}/>
      </div>
      <div id="score">
      <Score currenttotal={this.state.currenttotal} total={this.state.total} words={this.state.storage} currentword={this.state.currentword}/>
      </div>
      </div>

    );
  }
}
