import { makeAutoObservable, configure, runInAction } from 'mobx';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';

configure({ enforceActions: 'always' });

export default class ActivityStore {
    activityRegistry = new Map<string, IActivity>();
    selectedActivity: IActivity | undefined = undefined;
    loadingInitial = false;
    editMode = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;
            })

        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    };

    createActivity = async (activity: IActivity) => {
        this.submitting = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            })

        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    deleteActivity = async (id: string) => {
        this.submitting = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.submitting = false);
        }
    }

    openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    };

    openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    cancelFormOpen = () => {
        this.editMode = false;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    };
}

