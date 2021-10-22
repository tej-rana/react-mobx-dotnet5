import React, {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {Header, List} from 'semantic-ui-react'

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then((response:any) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Activities' />
        <List>
            {activities.map((activity: any) =>
                <List.Item key={activity.id}>{activity.title}</List.Item>
            )}
        </List>
    </div>
  );
}

export default App;