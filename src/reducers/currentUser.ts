import { USER_LOGIN, USER_LOGOUT } from '../actions/currentUser';

export default function currentUser(state = null, action) {
    switch (action.type) {
        case USER_LOGIN:
            return action.currentUser;
        case USER_LOGOUT:
            return null;
        default:
            return state;
    }
}
