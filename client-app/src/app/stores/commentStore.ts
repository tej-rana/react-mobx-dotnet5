import {ChatComment} from "../models/comment";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {makeAutoObservable, runInAction} from "mobx";
import {store} from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
       makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if(store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5100/chat?activityId=' + activityId, {
                accessTokenFactory: () => store.userStore.user?.token!
            })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(err => console.log('Error establishing connection', err))

            this.hubConnection.on('onLoadComments', (comments: ChatComment []) => {
                runInAction(() => {
                    comments.forEach(c => {
                       c.createdAt = new Date(c.createdAt + 'Z');
                    });
                    this.comments = comments;
                } )
            })
            this.hubConnection.on('onReceiveComment',(comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment);
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(err => console.log('Error stopping connection', err))
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (e) {
            console.log(e);
        }
    }

}
