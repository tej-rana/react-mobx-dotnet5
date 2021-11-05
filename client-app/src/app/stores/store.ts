import ActivityStore from "./activityStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CommentStore from "./commentStore";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    commentStore: CommentStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
