import { connect } from 'react-redux';
import { userLogin } from '../../actions/currentUser';
import { LoginPageComponent, ReduxDispatchProps, ReduxStateProps } from './component';

function mapDispatchToProps(dispatch): ReduxDispatchProps {
    return({ userLogin: (login: string) => dispatch(userLogin(login)) });
}

function mapStateToProps(state): ReduxStateProps {
    return ({
        currentUser: state.currentUser,
        users: state.users,
    });
}

export const LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps)(
    LoginPageComponent,
);
