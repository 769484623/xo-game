import * as ActionTypes from './ActionType'
import {reduxStore} from './ReduxStore'

export function changeGameState(state = 0) {//Restart the game
    let arr = [];
    if(state === 0){
        for(let i = 0;i < reduxStore.getState().GameMap.length;i++){
            arr[i] = 0;
        }
        return {type:ActionTypes.GameStateChanged,Config:{GameState:0,GameMap:arr}}
    }
    else
    {
        return {type:ActionTypes.GameStateChanged,Config:{GameState:1}}
    }
}

export function usrClickScreen(blockNumber) {
    let arr = [];
    for(let i = 0;i < reduxStore.getState().GameMap.length;i++){
        arr[i] = reduxStore.getState().GameMap[i];
    }
    if(reduxStore.getState().GameState !== 1 && arr[blockNumber] === 0){
        arr[blockNumber] = 1;
        aiPlacePiece(arr);
        let result = checkWinner(arr);
        if(result !== 0)
        {
            return {type:ActionTypes.GameStateChanged,Config:{GameState:result,GameMap:arr}}
        }
    }
    return {type:ActionTypes.ScreenClicked,newGameMap:arr};
}

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random() * minNum + 1,10);
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        default:
            return 0;
    }
}

function aiPlacePiece(array) {
    if(!checkFull(array)){
        while (true){
            let num = randomNum(0,8);
            if(array[num] !== 0)
                continue;
            else
            {
                array[num] = 2;
                break;
            }
        }
    }
}

function checkFull(array) {
    for(let i = 0;i < array.length;i++){
        if(array[i] === 0)
            return false;
    }
    return true;
}

function checkWinner(array) {
    //纵向判断
    for(let i = 0;i < Math.sqrt(array.length);i++){
        if(array[i] !== 0 && array[i] === array[3 + i] && array[i] === array[i + 6]){
            return array[i];
        }
    }
    //横向判断
    for(let i = 0;i < Math.sqrt(array.length);i++){
        if(array[i*3] !== 0 && array[i*3] === array[i*3 + 1] && array[i*3] === array[i*3+2]){
            return array[i*3];
        }
    }
    //对角线
    if(array[4] !== 0 && ((array[4] === array[0] && array[4] === array[8]) || (array[4] === array[2] && array[4] === array[6])))
    {
        return array[4];
    }
    if(!checkFull(array)){
        return 0;
    }
    return 3;
}