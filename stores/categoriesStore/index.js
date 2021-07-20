import {makeAutoObservable} from "mobx";

import { categoriesService } from 'API'

class CategoryStore{
    categories = [];
    isLoading = false;
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getCategories(){
        const response = await categoriesService.getCategoriesApi()
        console.log(response)
        if(response.status === 200) {
            this.setCategories(response.data)
            this.isLoading = true
            this.id = response.data[0].id
        }
    }

    // @ts-ignore
    get getCategoriesTable(){
        return this.categories;
    }

    setCategories(categories){
        this.categories = categories
    }
}

export default new CategoryStore();
