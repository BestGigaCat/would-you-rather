import { combineReducers } from 'redux';
import currentUser from './currentUser';
import questions from './questions';
import users from './users';

export interface GlobalState {
    currentUser: string;
    questions: object;
    users: string[];
}

export default combineReducers({
    currentUser,
    questions,
    users,
});
