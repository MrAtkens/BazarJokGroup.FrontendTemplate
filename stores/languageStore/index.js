import {makeAutoObservable} from "mobx";

class LanguageStore{
    activeLanguage = {};
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    // @ts-ignore
    get getActiveLanguage(){
        return this.categories;
    }

    setActiveLanguage(language){
        this.activeLanguage = language
    }
}

export default new LanguageStore();
