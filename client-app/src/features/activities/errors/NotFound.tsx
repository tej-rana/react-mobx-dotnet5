import React from 'react';
import {Button, Header, Icon, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Looks like we have a mystery on our hands
            </Header>
            <Segment.Inline>
                <Button as={Link} to={'/activities'} primary>
                    Return to activities
                </Button>
            </Segment.Inline>
        </Segment>
    )
}
