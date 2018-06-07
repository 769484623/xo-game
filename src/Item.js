import React,{ Component } from 'react'
import {reduxStore} from './dataStore/ReduxStore'
import  {usrClickScreen} from './dataStore/Actions'
import picBlank from './blank.png'
import picX from './X.jpeg'
import picO from './O.jpeg'

const ItemStyle = {
    'borderStyle':'dotted',
    'textAlign':'left',
    'height':'100px',
    'weight':'100px',
    'borderRadius':'10px',
    'margin':'5px'
};
export class Item extends Component{
    constructor(props){
        super(props);
        this.imgOnClickedHandler = this.imgOnClickedHandler.bind(this);
        this.state = {blockID:props.blockID,picSrc:picBlank};
        reduxStore.subscribe(()=>{
            let newState = reduxStore.getState();
            if(newState.GameMap[this.state.blockID] === 1){
             this.setState({picSrc:picX});
            }
            else if(newState.GameMap[this.state.blockID] === 2){
                this.setState({picSrc:picO});
            }
            else{
                this.setState({picSrc:picBlank});
            }
        });
    }
    imgOnClickedHandler(){
        if(reduxStore.getState().GameState === 0){
            reduxStore.dispatch(usrClickScreen(this.state.blockID));
        }
    }
    render(){
        return (
            <img src={this.state.picSrc} alt={'XPicture'} style={ItemStyle} onClick={this.imgOnClickedHandler}>

            </img>
        );
    }
}