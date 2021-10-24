import react, {SyntheticEvent, useState} from 'react';
import {Activity} from "../../../app/models/activity";
import {Segment, Item, Button, Label} from "semantic-ui-react";

interface Props  {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id:string) => void;
    submitting: boolean;
};

export default function ActivityList({activities, selectActivity, deleteActivity, submitting } : Props) {

    const [target, setTarget] = useState('');

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button name={activity.id}
                                        loading={submitting && target == activity.id}
                                        onClick={(e) => handleActivityDelete(e, activity.id)}
                                        floated='right'
                                        color='red'
                                        content='Delete' />
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                }
            </Item.Group>
        </Segment>
    );

}