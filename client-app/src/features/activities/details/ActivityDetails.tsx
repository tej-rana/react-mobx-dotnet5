import {Grid} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useParams} from "react-router-dom";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSideBar from "./ActivityDetailSideBar";

export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadActivity(id)
        return clearSelectedActivity();
    }, [id, loadActivity, clearSelectedActivity]);


    if(loadingInitial || !activity) return <LoadingComponent />;

    return (
       <Grid>
           <Grid.Column width={10}>
               <ActivityDetailHeader activity={activity} />
               <ActivityDetailInfo activity={activity} />
               <ActivityDetailChat activityId={activity.id} />
           </Grid.Column>
           <Grid.Column width={6}>
               <ActivityDetailSideBar activity={activity} />
           </Grid.Column>
       </Grid>
    )
})
