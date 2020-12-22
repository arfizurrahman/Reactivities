import React, { useState, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid'
import { useStore } from '../../../app/stores/store';
import { useHistory, useParams } from 'react-router-dom';
import { ActivityFormValues } from '../../../app/models/activity';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { category } from '../../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';

const validate = combineValidators({
    title: isRequired({ message: 'The event title is required' }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time'),
})

const ActivityForm = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { activityStore } = useStore();
    const { createActivity, editActivity, submitting, loadActivity } = activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            loadActivity(id)
                .then((activity) => setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [loadActivity, id])

    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);

        const { date, time, ...activity } = values;
        activity.date = dateAndTime;
        console.log(activity);
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    }


    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing >
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='title'
                                    placeholder='Title'
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    name='description'
                                    rows={3}
                                    placeholder='Description'
                                    value={activity.description}
                                    component={TextAreaInput}
                                />
                                <Field
                                    name='category'
                                    placeholder='Category'
                                    value={activity.category}
                                    options={category}
                                    component={SelectInput}
                                />
                                <Form.Group widths='equal'>
                                    <Field
                                        name='date'
                                        placeholder='Date'
                                        value={activity.date}
                                        date={true}
                                        component={DateInput}
                                    />
                                    <Field
                                        name='time'
                                        placeholder='Time'
                                        value={activity.time}
                                        time={true}
                                        component={DateInput}
                                    />
                                </Form.Group>

                                <Field
                                    name='city'
                                    placeholder='City'
                                    value={activity.city}
                                    component={TextInput}
                                />
                                <Field
                                    name='venue'
                                    placeholder='Venue'
                                    value={activity.venue}
                                    component={TextInput}
                                />
                                <Button loading={submitting} disabled={loading || invalid || pristine} floated='right' positive type='submit' content='Submit' />
                                <Button
                                    onClick={activity.id
                                        ? () => history.push(`/activities/${activity.id}`)
                                        : () => history.push('/activities')}
                                    floated='right'
                                    type='button'
                                    disabled={loading}
                                    content='Cancel'
                                />
                            </Form>
                        )}
                    />

                </Segment>

            </Grid.Column>
        </Grid>

    );
};

export default observer(ActivityForm);
