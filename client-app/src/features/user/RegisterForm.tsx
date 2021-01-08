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
    username: isRequired('username'),
    displayName: isRequired('display name'),
    email: isRequired('email'),
    password: isRequired('password')
})

const RegisterForm = () => {

    const { userStore: { register } } = useStore();

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
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
                <Form onSubmit={handleSubmit} error autoComplete="off">
                    <Header as='h2'
                        content='Sign up to Reactivities'
                        color='teal'
                        textAlign='center'
                    />
                    <Field name="username" component={TextInput} placeholder="Username" />
                    <Field name="displayName" component={TextInput} placeholder="Display Name" />
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
                        />
                    }

                    <Button disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color='teal'
                        content='Register' fluid />
                </Form>
            )}
        />
    )
}

export default RegisterForm
