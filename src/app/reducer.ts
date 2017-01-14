import { ActionReducer, Action } from '@ngrx/store';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const HOMEVALUE = 'HOMEVALUE';
export const GET_ITEMS = "GET_ITEMS";
export interface Item {
    id: number;
    name: string;
    description: string;
};
export interface AppState {
    count: number;
    data: string;
    items: Item[];
};
const initialState: AppState = {
    count: 0,
    data: "Hello World!",
    items: []
};
export const counterReducer: ActionReducer<AppState> = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1,
                data: state.data,
                items: state.items
            };
        case DECREMENT:
            return {
                count: state.count - 1,
                data: state.data,
                items: state.items
            };
        case HOMEVALUE:
            return {
                count: state.count,
                data: action.payload,
                items: state.items
            };
        case RESET:
            return Object.assign({}, initialState, {
                myTest: "My Value"
            });
        case GET_ITEMS:
            return {
                count: state.count,
                data: state.data,
                items: action.payload
            };
        default:
            return state;
    }
}