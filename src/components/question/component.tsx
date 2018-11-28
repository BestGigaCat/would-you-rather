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

export class QuestionPickerComponent extends React.Component<Props> {
    public render() {
        if (this.props.currentUser === null || this.props.currentUser === '') {
            return (
                <Redirect to={{ pathname: '/login', state: { from: '/answered' } }}/>);
        }
        const answeredQuestionID: {id, timestamp}[] = [];
        Object.keys(this.props.users[this.props.currentUser].answers).forEach((key, index) => {
            answeredQuestionID.push({ id: key, timestamp: this.props.questions[key].timestamp });
        });
        answeredQuestionID.sort((a, b) => b.timestamp - a.timestamp);
        const answeredQuestions: JSX.Element[] = answeredQuestionID.map((value, index) => {
            const question = this.props.questions[value.id];
            return (
                <div key={question.id}>
                    ID: <div>{question.id}</div>
                    <p>Option One: {question.optionOne.text}</p>
                    <p>Percentage of ppl voted option one: {Math.round((question.optionOne.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100)}%</p>
                    <p># of ppl voted option one: {question.optionOne.votes.length}</p>

                    <p>Option One: {question.optionTwo.text}</p>
                    <p>Percentage of ppl voted option two: {Math.round((question.optionTwo.votes.length/(question.optionOne.votes.length+question.optionTwo.votes.length))*100)}%</p>
                    <p># of ppl voted option two: {question.optionTwo.votes.length}</p>

                    Create Date: <div>{new Date(this.props.questions[value.id].timestamp).toDateString()}</div>
                    # of ppl who answered: <div>{question.optionOne.votes.length+question.optionTwo.votes.length}</div>
                    <div>{this.renderButton(question.id)}</div>
                    <br/>
                </div>
            );
        });
        return (
            <div>
                Answered Questions
                {answeredQuestions}
            </div>
        );
    }
    private renderButton = (id: string) => {
        return <Link to={`/questions/${id}?ifAnswered=true`}>View Details</Link>;
    }
}
