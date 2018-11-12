import * as React from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

interface PublicProps {
}

interface State {
    userSelected: string;
}

export interface ReduxStateProps {
    users: Map<string, any>;
    currentUser: string;
}

export interface ReduxDispatchProps {
    userLogin: (login: string) => any;
}

export interface RouteProps {}

export type Props = PublicProps & ReduxDispatchProps & ReduxStateProps & RouteComponentProps<RouteProps>;

export class LoginPagePresentation extends React.Component<Props, State> {
    public state: State = {
        userSelected: '',
    };

    constructor(props) {
        super(props);
    }

    public render() {
        if (this.props.currentUser === null || this.props.currentUser === '') {
            const userMap: Map<string, any> = this.props.users;
            const options: string[] = [];
            options.push('');
            Object.keys(userMap).forEach((key, index) => {
                options.push(key);
            });
            const indents: JSX.Element[] = [];
            options.map((item, index) => {
                indents.push(<option value={`${item}`}>{item}</option>);
            });
            return (
                <div>
                    Please log in here:
                    <select onChange={this.onLoginChange}>
                        {indents}
                    </select>
                </div>
            );
        } else {
            return <Redirect to={`${this.props.location.state.from}`}/>;
        }
    }

    private onLoginChange = (e) => {
        this.props.userLogin(e.target.value);
    }
}

export const LoginPageComponent = withRouter(LoginPagePresentation);
