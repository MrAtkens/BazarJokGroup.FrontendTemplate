import {makeAutoObservable, runInAction} from "mobx";
import {toastProductAddToWishList, toastProductRemoveFromWishList} from 'utilities/toastify'

class WishList{
    wishList = [];
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getWishList(){
        // const response = await wishListService.getWishList()
        // console.log(response)
        // this.setWishList(response.data)
        if(JSON.parse(await localStorage.getItem('wishList')) !== null){
            this.setWishList(JSON.parse(await localStorage.getItem('wishList')))
        }
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
        const index = this.wishList.findIndex(productItem => productItem.product.id === product.id);
        if (index === -1) {
            runInAction(() => {
                this.wishList.push({product: product, quantity: 1})
            })
        } else {
            runInAction(() => {
                this.wishList[index].quantity++
            })
        }
        localStorage.setItem("wishList", JSON.stringify(this.wishList))
        toastProductAddToWishList(product.name)
    }

    async deleteWishList(product){
        // const response = await wishListService.deleteWishList(product.id)
        // console.log(response)
        // productRemoveFromWishList(response.status, product.title)
        // if(response.status === 200)
        //     await this.getWishList()
        runInAction(() => {
            this.wishList = this.wishList.filter(productItem => productItem.product !== product)
        })
        if (this.wishList.length <= 0) {
            localStorage.removeItem("wishList")
        } else {
            localStorage.removeItem("wishList")
            localStorage.setItem("wishList", JSON.stringify(this.wishList))
        }
        toastProductRemoveFromWishList(product.name)
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
