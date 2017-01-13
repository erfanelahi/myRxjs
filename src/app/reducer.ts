import { ActionReducer, Action } from '@ngrx/store';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const HOMEVALUE = 'HOMEVALUE';
export interface AppState {
    count: number;
    data: string;
};
const initialState: AppState = {
    count: 0,
    data: "Hello World!"
};
export const counterReducer: ActionReducer<AppState> = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1,
                data: state.data
            };
        case DECREMENT:
            return {
                count: state.count - 1,
                data: state.data
            };
        case HOMEVALUE:
            return {
                count: state.count,
                data: action.payload
            };
        case RESET:
            return  Object.assign({}, initialState, {
                myTest : "My Value"
            });
        default:
            return state;
    }
}