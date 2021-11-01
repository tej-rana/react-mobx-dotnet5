import React, {useEffect} from 'react';
import { Container} from 'semantic-ui-react'
import NavBar from "./NavBar";
import {observer} from "mobx-react-lite";
import {Route, Switch, useLocation} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/activities/errors/TestError";
import {ToastContainer} from "react-toastify";
import NotFound from "../../features/activities/errors/NotFound";
import ServerError from "../../features/activities/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import {useStore} from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
    const location = useLocation();
    const {commonStore, userStore} = useStore();
    useEffect(() => {
       if(commonStore.token) {
           userStore.getUser().finally(() => commonStore.setAppLoad());
       } else {
           commonStore.setAppLoad();
       }
    }, [userStore, commonStore]);

    if(!commonStore.appLoaded) return <LoadingComponent content={'Loading app..'} />

    return (
        <>
            <ToastContainer position={'bottom-right'} hideProgressBar/>
            <ModalContainer />
            <Route path='/'  exact component={HomePage} />
            <Route
            path={'/(.+)'}
            render={() => (
                <>
                    <NavBar />
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route path='/activities' exact component={ActivityDashboard} />
                            <Route path='/activities/:id' component={ActivityDetails} />
                            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                            <Route path={'/errors'} component={TestErrors} />
                            <Route path={'/server-error'} component={ServerError} />
                            <Route path={'/login'} component={LoginForm} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </>
            )}
            />
        </>
    );
}

export default observer(App);
