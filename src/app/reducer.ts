import { ActionReducer, Action } from '@ngrx/store';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const HOMEVALUE = 'HOMEVALUE';
export const GET_ITEMS = "GET_ITEMS";
export const CREATE_ITEM = "CREATE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
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
        case CREATE_ITEM:
            return {
                count: state.count,
                data: state.data,
                items: [...state.items, action.payload]
            };
        case UPDATE_ITEM:
            return {
                count: state.count,
                data: state.data,
                items: state.items.map(item => {
                    return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
                })
            };
        case DELETE_ITEM:
            return {
                count: state.count,
                data: state.data,
                items: state.items.filter(item => {
                    return item.id !== action.payload.id;
                })
            }
        default:
            return state;
    }
}