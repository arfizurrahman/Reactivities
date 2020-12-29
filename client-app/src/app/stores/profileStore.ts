import { toast } from 'react-toastify';
import { IPhoto, IProfile } from './../models/profile';
import { makeAutoObservable, configure, runInAction } from 'mobx';
import agent from '../api/agent';
import { store } from './store';

configure({ enforceActions: 'always' });

export default class ProfileStore {
    profile: IProfile | null = null;
    loadingProfile = true;
    uploadingPhoto = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        } else {
            return false;
        }
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingProfile = false;
            })
            console.log(error);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await agent.Profiles.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.user.image = photo.url;
                        this.profile.image = photo.url;
                    }
                }
                this.uploadingPhoto = false;
            })
        } catch (error) {
            console.log(error)
            toast.error("Problem uploading photo");
            runInAction(() => {
                this.uploadingPhoto = false;
            })
        }
    }

    setMainPhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            runInAction(() => {
                store.userStore.user!.image = photo.url;
                this.profile!.photos.find(p => p.isMain)!.isMain = false;
                this.profile!.photos.find(p => p.id === photo.id)!.isMain = true;
                this.profile!.image = photo.url;
                this.loading = false;
            })
        } catch (error) {
            toast.error("Problem setting main photo");
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePhoto = async (photo: IPhoto) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                this.profile!.photos = this.profile!.photos.filter(p => p.id !== photo.id);
                this.loading = false;
            })
        } catch (error) {
            toast.error("Problem deleting the photo");
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}