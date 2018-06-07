import React, { Component } from 'react';
import {Item} from './Item'
import {Button,Modal} from 'antd'
import {reduxStore} from "./dataStore/ReduxStore";
import {changeGameState} from "./dataStore/Actions";

import '../node_modules/antd/dist/antd.css'

const divStyle = {
    'textAlign':'center',
};

class App extends Component {
    constructor(props){
        super(props);
        this.playField = [];
        for(let i = 0;i < 3;i++)
        {
            let Arr = [];
            for(let k = 0;k < 3;k++)
            {
                Arr[k] = React.createElement(Item,{key:i * 3+ k,blockID:i * 3+ k})
            }
            this.playField[i]= React.createElement('div',{key:'container' + i},Arr)
        }
        this.restartTheGame = this.restartTheGame.bind(this);
        reduxStore.subscribe(()=>{
            let newState = reduxStore.getState();
            if(newState.GameState === 1){
                Modal.success(
                    {
                        title: '恭喜，你获胜了',
                        content: '恭喜你！你赢得了比赛！'
                    });
                this.setState({grades:this.state.grades + 1})
            }
            else if(newState.GameState === 2){
                Modal.warn(
                    {
                        title: '你输了！',
                        content: '你输了！请继续努力！'
                    }
                    );
            }
            else if(newState.GameState === 3){
                Modal.info(
                    {
                    title: '平局！',
                    content: '本次为平局！'
                }
                )
            }
        });
        this.state = {grades:0}
    }
    restartTheGame(){
        reduxStore.dispatch(changeGameState(0))
    }
    render() {
        return (
            <div style={divStyle}>
                <nav>
                    <span>当前分数：{this.state.grades}</span>
                </nav>
                <main>
                    <br/>
                    <div id={'play-board'}>
                        {this.playField}
                    </div>
                    <br/>
                    <Button onClick={this.restartTheGame}>开始新的游戏</Button>
                </main>
            </div>
        );
    }
}

export default App;
