import { useState } from 'react';
import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './sign-in.styles';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


const SignIn = ({ emailSignInStart, googleSignInStart }) => {

    const [userCredentials, setCredentials] = useState({ email: "", password: "" })

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    }
    return (
        <SignInContainer>
            <SignInTitle> I already have an account</SignInTitle>
            <span> Sign in with your email  and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput name="email" type="email" handleChange={handleChange} value={email} required label="email" />

                <FormInput name="password" type="password" handleChange={handleChange} value={password} required label="password" />

                <ButtonsBarContainer>
                    <CustomButton type="submit"> Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>{' '} Sign in with google {' '}</CustomButton>
                </ButtonsBarContainer>
            </form>

        </SignInContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);