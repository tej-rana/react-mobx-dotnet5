import React from 'react';
import {Formik, Form, ErrorMessage,} from 'formik';
import MyTextInput from "../../app/common/form/MyTextInput";
import {Button, Header, Label} from "semantic-ui-react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import * as Yup from 'yup';
import ValidationErrors from "../activities/errors/ValidationErrors";

export default observer(function RegisterForm() {

    const {userStore} = useStore();

    const validationSchema = Yup.object({
        email: Yup.string().required('The activity title is required').email('Please enter correct email'),
        username: Yup.string().required(),
        displayName: Yup.string().required(),
        password: Yup.string().required()
    });

    return (
        <Formik
            initialValues={{email: '', password: '', displayName: '', username: '', error: null}}
            onSubmit={ (values,
                        {setErrors}) => userStore.register(values).catch(error => setErrors({error}))}
            validationSchema={validationSchema}

        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className={'ui form error'} onSubmit={handleSubmit} autoComplete={'off'}>
                    <Header as={'h2'} content={'Sgin Up to Activities'} color={'teal'} textAlign={'center'} />
                    <MyTextInput placeholder={'Display Name'} name={'displayName'} />
                    <MyTextInput placeholder={'Username'} name={'username'} />
                    <MyTextInput placeholder={'Email'} name={'email'} />
                    <MyTextInput placeholder={'Password'} name={'password'} type={'password'} />
                    <ErrorMessage
                        name={'error'}
                        render={() => <ValidationErrors errors={errors.error} /> }
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content={'Login'} type={'submit'} fluid />
                </Form>
            )}
        </Formik>
    )
})
