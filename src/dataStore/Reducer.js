import * as ActionTypes from './ActionType';

export const AppReducers = (state,action) => {
    switch (action.type)
    {
        case ActionTypes.ScreenClicked:{
            return Object.assign({},state,{GameMap:action.newGameMap});
        }
        case ActionTypes.GameStateChanged:{
            return Object.assign({},state,{...action.Config});
        }
        default:
        {
            return state;
        }
    }
};