import { history } from '../..';
import { IUser, IUserFormValues } from './../models/user';
import { makeAutoObservable, configure, runInAction } from 'mobx';
import agent from '../api/agent';
import { store } from './store';

configure({ enforceActions: 'always' });

export default class UserStore {
    refreshTokenTimeout: any;
    user: IUser | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() { return !!this.user }

    login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            console.log(user);
            runInAction(() => {
                this.user = user;
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user);
                store.modalStore.closeModal()
            })

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
                this.startRefreshTokenTimer(user);
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
            runInAction(() => {
                this.user = user;
            })
            store.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            store.modalStore.closeModal();
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.User.refreshToken();
            runInAction(() => {
                this.user = user;
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user);
            })
        } catch (error) {
            console.log(error)
        }
    }

    getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
                store.commonStore.setToken(user.token);
                this.startRefreshTokenTimer(user);
            });
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: IUser) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}