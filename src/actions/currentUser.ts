export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGIN';

export function userLogin(userId: string) {
    return {
        type: USER_LOGIN,
        currentUser: userId,
    };
}

export function userLogOut() {
    return {
        type: USER_LOGOUT,
    };
}
