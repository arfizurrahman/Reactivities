import { makeAutoObservable, configure, observable } from 'mobx';

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
        this.modal.open = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}