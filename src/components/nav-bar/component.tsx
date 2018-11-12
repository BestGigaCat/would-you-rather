import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { userLogOut } from '../../actions/currentUser';
import '../../App.scss';

interface ReduxStateProps {
    users: Object;
    currentUser: string;
}

interface PublicProps {}

interface ReduxDispatchProps {
    userLogOut: () => void;
}

type Props = ReduxStateProps & ReduxDispatchProps & PublicProps;

class NavBarComponent extends Component<Props> {

    public render() {
        let logInOutText = 'Logout';
        if (this.props.currentUser === null) {
            logInOutText = 'Log In';
        }
        return (
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/answered" exact>Answered Questions</NavLink>
                <NavLink to="/unanswered" exact>Unanswered Questions</NavLink>
                <NavLink to="/leaderboard" exact>Leaderboard</NavLink>
                <NavLink to="/add" exact>Add Question</NavLink>
                {this.props.currentUser !== null && this.props.currentUser !== '' && (
                    <div className="current-user">
                        You are logged in as {this.props.users[this.props.currentUser].name}
                    </div>)
                }
                <NavLink to="/logout" exact onClick={this.logoutCurrentUser}>{logInOutText}</NavLink>
            </nav>
        );
    }

    private logoutCurrentUser = (e) => {
        if (this.props.currentUser !== null) {
            this.props.userLogOut();
        }
    }
}

function mapStateToProps(globalState): ReduxStateProps {
    return {
        currentUser: globalState.currentUser !== null && globalState.currentUser !== '' ? globalState.currentUser : '',
        users: globalState.users,
    };
}

function mapDispatchToProps(dispatch): ReduxDispatchProps {
    return({ userLogOut: () => dispatch(userLogOut()) });
}

export const NavBar = compose(
    connect<ReduxStateProps, ReduxDispatchProps, PublicProps>(mapStateToProps, mapDispatchToProps),
    withRouter,
)(NavBarComponent) as React.ComponentClass<{}>;
