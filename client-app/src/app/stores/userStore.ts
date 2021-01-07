import { history } from '../..';
import { IUser, IUserFormValues } from './../models/user';
import { makeAutoObservable, configure, runInAction } from 'mobx';
import agent from '../api/agent';
import { store } from './store';

configure({ enforceActions: 'always' });

export default class UserStore {
    user: IUser | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() { return !!this.user }

    login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            })
            store.commonStore.setToken(user.token);
            store.modalStore.closeModal()
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        history.push('/')
    }

    fbLogin = async (response: any) => {
        this.loading = true;
        try {
            const user = await agent.User.fbLogin(response.accessToken);
            runInAction(() => {
                this.user = user;
                store.commonStore.setToken(user.token);
                store.modalStore.closeModal();
                this.loading = false;
            });

            history.push('/activities');
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
            throw error;
        }
    }

    register = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.register(values);
            store.commonStore.setToken(user.token);
            store.modalStore.closeModal();
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }

    getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
        }
    }
}