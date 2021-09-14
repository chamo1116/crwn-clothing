import { Component } from 'react';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: '', password: "" });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <SignInContainer>
                <SignInTitle> I already have an account</SignInTitle>
                <span> Sign in with your email  and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" handleChange={this.handleChange} value={this.state.email} required label="email" />

                    <FormInput name="password" type="password" handleChange={this.handleChange} value={this.state.password} required label="password" />

                    <ButtonsBarContainer>
                        <CustomButton type="submit"> Sign In</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>{' '} Sign in with google {' '}</CustomButton>
                    </ButtonsBarContainer>
                </form>

            </SignInContainer>
        )
    }
}

export default SignIn;