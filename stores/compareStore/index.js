import {makeAutoObservable, runInAction} from "mobx";
import { wishListService } from 'API'
import { productAddToCompareList, productRemoveFromCompareList, productGet } from 'utilities/responseStatus'
import { toastCompareListIsProduct } from 'utilities/toastify'

class CompareStore{
    compare = [];
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getCompareStore(){
        const response = await wishListService.getCompareStore()
        console.log(response)
        this.setCompareStore(response.data)
    }

    async acceptCompareStore(product){
        // const responseWish = await wishListService.productInWish(product.id)
        // console.log(responseWish)
        // productGet(responseWish.status)
        // if(responseWish.data === true){
        //     toastCompareListIsProduct()
        // }
        // else {
        //     const response = await wishListService.acceptCompareStore(product.id)
        //     console.log(response)
        //     productAddToCompareList(response.status, product.title)
        //     if (response.status === 200)
        //         await this.getCompareStore()
        // }
        this.compare.push(product)
        productAddToCompareList(200, product.title)
    }

    async deleteCompareStore(product){
        let index = this.compare.findIndex(item => item.id === product.id)
        this.compare.splice(index, 1);
    }

    // @ts-ignore
    get getCompareStoreTable() {
        return this.wishList;
    }

    setCompareStore(wishList){
        this.wishList = wishList
    }
}

export default new CompareStore();
