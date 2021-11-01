import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivitiyList";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilter from "./ActivityFilters";

export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const { loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content={'Loading activities...'}/>

    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
              <ActivityFilter />
            </Grid.Column>
        </Grid>
    )
})
