import {makeAutoObservable, runInAction} from "mobx";
import { wishListService } from 'API'
import { productAddToWishList, productRemoveFromWishList, productGet } from 'utilities/responseStatus'
import { toastWishListIsProduct} from 'utilities/toastify'

class WishList{
    wishList = [];
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getWishList(){
        const response = await wishListService.getWishList()
        console.log(response)
        this.setWishList(response.data)
    }

    async acceptWishList(product){
        // const responseWish = await wishListService.productInWish(product.id)
        // console.log(responseWish)
        // productGet(responseWish.status)
        // if(responseWish.data === true){
        //     toastWishListIsProduct()
        // }
        // else {
        //     const response = await wishListService.acceptWishList(product.id)
        //     console.log(response)
        //     productAddToWishList(response.status, product.title)
        //     if (response.status === 200)
        //         await this.getWishList()
        // }
        this.wishList.push(product)
    }

    async deleteWishList(product){
        const response = await wishListService.deleteWishList(product.id)
        console.log(response)
        productRemoveFromWishList(response.status, product.title)
        if(response.status === 200)
            await this.getWishList()
    }

    // @ts-ignore
    get getWishListTable() {
        return this.wishList;
    }

    setWishList(wishList){
        this.wishList = wishList
    }
}

export default new WishList();