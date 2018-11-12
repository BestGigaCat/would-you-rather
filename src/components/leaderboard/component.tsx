import * as React from 'react';
import { Redirect } from 'react-router';
import { User } from '../../models/user';

export interface ReduxStateProps {
    questions: Map<string, any>;
    currentUser: string;
    users: Map<string, User>;
}

type Props = ReduxStateProps;

export class LeaderBoardComponent extends React.Component<Props> {
    public render() {
        if (this.props.currentUser === null || this.props.currentUser === '') {
            return (
                <Redirect to={{ pathname: '/login', state: { from: '/leaderboard' } }}/>);
        }
        const ranks: {total, user}[] = [];
        Object.keys(this.props.users).forEach((key, index) => {
            ranks.push({ user: key, total: this.totalCreated(key) + this.totalAnswered(key) });
        });
        ranks.sort((a, b) => b.total - a.total);

        const usersInfo: JSX.Element[] = ranks.map((key, index) => {
            const user = this.props.users[key.user];
            return(
                <div key={user.id}>
                    <p>ID: <div>{user.id}</div></p>
                    <p>Name: <div>{user.name}</div></p>
                    <p>Avatar: <img width="100" height="100" src={user.avatarURL}/></p>
                    <p># of Created Questions:<div>{this.totalCreated(key.user)}</div></p>
                    <p># of Answered Questions: <div>{this.totalAnswered(key.user)}</div></p>
                    <p># of Total Sum: <div>{key.total}</div></p>
                </div>);
        });
        return (
            <div>
                Leader-board
                {usersInfo}
            </div>
        );
    }

    private totalCreated = (user: string) => {
        return this.props.users[user].questions.length;
    }

    private totalAnswered = (user: string) => {
        const answeredQuestionID: string[] = [];
        Object.keys(this.props.users[user].answers).forEach((key, index) => {
            answeredQuestionID.push(key);
        });
        return answeredQuestionID.length;
    }
}
