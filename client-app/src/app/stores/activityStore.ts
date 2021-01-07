import { createAttendee } from './../common/util/util';
import { toast } from 'react-toastify';
import { history } from '../..';
import { makeAutoObservable, configure, runInAction, observable, reaction, toJS } from 'mobx';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { IActivity } from '../models/activity';
import agent from '../api/agent';
import { store } from './store';
import { setActivityProps } from '../common/util/util';

configure({ enforceActions: 'always' });

const LIMIT = 2;

export default class ActivityStore {
    activityRegistry = new Map();
    activity: IActivity | null = null;
    loadingInitial = false;
    loading = false;
    submitting = false;
    @observable.ref hubConnection: HubConnection | null = null;
    activityCount = 0;
    page = 0;
    predicate = new Map();

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.activityRegistry.clear();
                this.loadActivities();
            }
        )
    }

    get totalPages() {
        return Math.ceil(this.activityCount / LIMIT);
    }

    get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, value.toISOString());
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }

    }

    setPage = (page: number) => {
        this.page = page;
    }

    createHubConnection = (activityId: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
                accessTokenFactory: () => store.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log(this.hubConnection!.state))
            .then(() => {
                console.log('Attempting to join group');
                this.hubConnection!.invoke('AddToGroup', activityId)
            })
            .catch(error => console.log('Error establishing connection: ', error))

        this.hubConnection.on("ReceiveComment", comment => {
            runInAction(() => {
                this.activity!.comments.push(comment);
            })
        });

        // this.hubConnection.on('Send', message => {
        //     toast.info(message);
        // })
    }

    stopHubConnection = () => {
        this.hubConnection!.invoke('RemoveFromGroup', this.activity!.id)
            .then(() => {
                this.hubConnection!.stop();
            })
            .then(() => console.log('Connection stopped'))
            .catch(err => console.log(err))
    }

    addComment = async (values: any) => {
        values.activityId = this.activity!.id;
        try {
            await this.hubConnection!.invoke('SendComment', values);
        } catch (error) {
            console.log(error)
        }
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        )
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: IActivity[] }));
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const { activities, activityCount } = await agent.Activities.list(this.axiosParams);
            runInAction(() => {
                activities.forEach(activity => {
                    setActivityProps(activity, store.userStore.user!)
                    this.activityRegistry.set(activity.id, activity);
                });
                this.activityCount = activityCount;
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    };

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
            return toJS(activity);
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    setActivityProps(activity, store.userStore.user!)
                    this.activity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    this.loadingInitial = false;
                });
                return activity;
            } catch (error) {
                runInAction(() => {
                    this.loadingInitial = false;
                })
                console.log(error)
            }
        }
    }

    clearActivity = () => {
        this.activity = null;
    }
    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            const attendee = createAttendee(store.userStore.user!);
            attendee.isHost = true;
            let attendees = [];
            attendees.push(attendee);
            activity.attendees = attendees;
            activity.comments = [];
            activity.isHost = true;

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
            })
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
            console.log(error.response);
        }
    };

    editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            })
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
            console.log(error.response);
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

    attendActivity = async () => {
        const attendee = createAttendee(store.userStore.user!);
        this.loading = true;
        try {
            await agent.Activities.attend(this.activity!.id);
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees.push(attendee);
                    this.activity.isGoing = true;
                    this.activityRegistry.set(this.activity.id, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem singing up to activity')
        }

    }

    cancelAttendance = async () => {
        this.loading = true;
        try {
            await agent.Activities.unattend(this.activity!.id);
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees = this.activity.attendees.filter(a => a.username !== store.userStore.user?.username);
                    this.activity.isGoing = false;
                    this.activityRegistry.set(this.activity.id, this.activity);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            toast.error('Problem cancelling attendance');
        }
    }
}

