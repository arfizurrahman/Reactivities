import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Button, Form, Header } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import TextInput from '../../app/common/form/TextInput'
import ErrorMessage from '../../app/common/form/ErrorMessage'
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {

    const { userStore: { login } } = useStore();

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({
                handleSubmit,
                submitting,
                submitError,
                invalid,
                pristine,
                dirtySinceLastSubmit
            }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2'
                        content='Login to Reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field name="email" component={TextInput} placeholder="Email" />
                    <Field
                        name="password"
                        placeholder='Password'
                        type='password'
                        component={TextInput}
                    />
                    {submitError && !dirtySinceLastSubmit &&
                        <ErrorMessage
                            error={submitError}
                            text='Invalid email or password'
                        />
                    }

                    <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color='teal'
                        content='Login' fluid />
                </Form>
            )}
        />
    )
}

export default LoginForm
