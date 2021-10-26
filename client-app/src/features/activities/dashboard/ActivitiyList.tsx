import {SyntheticEvent, useState} from 'react';
import {Segment, Item, Button, Label} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

export default observer(function ActivityList() {

    const [target, setTarget] = useState('');

    const {activityStore} = useStore();

    const {deleteActivity, loading, activitiesByDate} = activityStore;

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
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
                                        loading={loading && target === activity.id}
                                        onClick={(e) => handleActivityDelete(e, activity.id)}
                                        floated='right'
                                        color='red'
                                        content='Delete' />
                                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                }
            </Item.Group>
        </Segment>
    );

})
