import { makeAutoObservable, configure, observable, runInAction } from 'mobx';

configure({ enforceActions: 'always' });

export default class ModalStore {
    @observable.shallow modal = {
        open: false,
        body: null
    }
    constructor() {
        makeAutoObservable(this)
    }

    openModal = (content: any) => {
        runInAction(() => {
            this.modal.open = true;
            this.modal.body = content;
        })
    }

    closeModal = () => {
        runInAction(() => {
            this.modal.open = false;
            this.modal.body = null;
        })
    }
}