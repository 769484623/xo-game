import {createStore} from 'redux';
import  {AppReducers} from './Reducer'

function getGameMap() {
    let arr = new Array(9);
    for(let i = 0;i < 9;i++){
        arr[i] = 0;
    }
    return arr;
}

export let reduxStore = createStore(AppReducers,
    {
        GameMap:getGameMap(),
        GameState:0,
    });