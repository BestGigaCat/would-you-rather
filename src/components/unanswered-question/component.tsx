import * as React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { User } from '../../models/user';

export interface ReduxDispatchProps {
    registerVote: (info) => void;
}

export interface ReduxStateProps {
    questions: Map<string, any>;
    currentUser: string;
    users: Map<string, User>;
}

type Props = ReduxStateProps & ReduxDispatchProps;

export class UnAnsweredQuestionPickerComponent extends React.Component<Props> {
    public render() {
        if (this.props.currentUser === null || this.props.currentUser === '') {
            return (
                <Redirect to={{ pathname: '/login', state: { from: '/unanswered' } }}/>);
        }
        const answeredQuestionID: string[] = [];
        Object.keys(this.props.users[this.props.currentUser].answers).forEach((key, index) => {
            answeredQuestionID.push(key);
        });

        const unansweredQuestionIDs: {id, timestamp}[] = [];
        Object.keys(this.props.questions).forEach((key, index) => {
            if (!answeredQuestionID.includes(key)) {
                const questionInfo = this.props.questions[key];
                unansweredQuestionIDs.push({ id: questionInfo.id, timestamp: questionInfo.timestamp });
            }
        });

        unansweredQuestionIDs.sort((a, b) => b.timestamp - a.timestamp);
        const unansweredQuestions: JSX.Element[] = unansweredQuestionIDs.map((value) => {
            const questionInfo = this.props.questions[value.id];
            return (
                <div key={questionInfo.id}>
                    ID: <div>{questionInfo.id}</div>
                    Option One: <div>{questionInfo.optionOne.text}</div>
                    Option Two: <div>{questionInfo.optionTwo.text}</div>
                    Created Date: <div>{new Date(questionInfo.timestamp).toDateString()}</div>
                    <div>{this.renderButton(questionInfo.id)}</div>
                    <br/>
                </div>
            );
        });
        return (
            <div>
                Unanswered Questions
                {unansweredQuestions}
            </div>
        );
    }
    private renderButton = (id: string) => {
        return <Link to={`/questions/${id}?ifAnswered=false`}>View Details</Link>;
    }
}
