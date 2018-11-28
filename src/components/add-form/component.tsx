import React, { Component } from 'react';
import { Redirect } from 'react-router';

interface PublicProps {}

interface State {
    optionOneText: string;
    optionTwoText: string;
}

export interface ReduxDispatchProps {
    addQuestion: (optionOneText: string, optionTwoText: string, currentUser: string) => void;
}

export interface ReduxStateProps {
    currentUser: string;
}

interface State {
    submitted?: boolean;
}

export type Props = PublicProps & ReduxStateProps & ReduxDispatchProps;

export class AddFormComponent extends Component<Props, State> {
    public state: State = {
        optionOneText: '',
        optionTwoText: '',
    };

    public render() {
        if (this.props.currentUser === null || this.props.currentUser === '') {
            return (
                <Redirect to={{ pathname: '/login', state: { from: '/add' } }}/>);
        }
        if (this.state.submitted) {
            return <Redirect to={'/'} />;
        }
        return(
            <div>
                Would You Rather
                <label>
                    Option One:
                    <input
                        name="optionOneText"
                        type="text"
                        value={this.state.optionOneText}
                        onChange={this.onChange}
                    />
                </label>
                <br />
                <label>
                    Option Two:
                    <input
                        name="optionTwoText"
                        type="text"
                        value={this.state.optionTwoText}
                        onChange={this.onChange}
                    />
                </label>
                <button disabled={this.ifDisabled()} onClick={this.onSubmit}>Submit</button>
            </div>
        );
    }

    private onSubmit = () => {
        this.props.addQuestion(this.state.optionOneText, this.state.optionTwoText, this.props.currentUser);
        this.setState({
            submitted: true,
        });
    }

    private ifDisabled = () => {
        if(this.state.optionTwoText && this.state.optionOneText) {
            return false;
        }
        return true;
    }

    private onChange = (event) => {
        const target = event.target;
        const value: string = target.value;
        const name: string = target.name;

        if (name === 'optionOneText') {
            this.setState({
                [name]: value,
            });
        }
        if (name === 'optionTwoText') {
            this.setState({
                [name]: value,
            });
        }
    }
}
