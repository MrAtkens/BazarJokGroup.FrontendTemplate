import {makeAutoObservable, runInAction} from "mobx";
import Router from 'next/router';

import {ordersService} from 'API'
import { userBuy } from 'utilities/responseStatus'
import { toastProductAddToCart, toastProductRemoveFromCart } from 'utilities/toastify'

class OrdersStore{
    orders = [];
    cart = [];
    productQuantity = "";
    error = "";
    id = "";

    constructor() {
        makeAutoObservable(this)
    }

    async getOrders(){
        console.log("OrderS GET")
        const response = await ordersService.getOrders()
        console.log(response)
        this.setOrders(response.data)
    }

    async getCart(){
        if(JSON.parse(await localStorage.getItem('cart')) !== null){
            this.setCart(JSON.parse(await localStorage.getItem('cart')))
        }
    }

    async acceptOrder(){
        this.cart.map(async item => {
            console.log(item)
            const response = await ordersService.orderProduct(item.product.id, item.quantity)
            console.log(response)
            userBuy(response.status)
            if(response.status === 200){
                this.cart = []
                localStorage.removeItem("cart")
            }
        })
        await this.getOrders().then(() => {
            Router.push("/")
        })
    }

    getProductQuantity(product){
        const index = this.cart.findIndex(productItem => productItem.product.id === product.id);
        if(index === -1)
            this.productQuantity = 0
        else
            this.productQuantity = this.cart[index].quantity
    }

    setOrders(orders){
        this.orders = orders
    }

    addCart(product){
        const index = this.cart.findIndex(productItem => productItem.product.id === product.id);
        if (index === -1) {
            runInAction(() => {
                this.cart.push({product: product, quantity: 1})
            })
        } else {
            runInAction(() => {
                this.cart[index].quantity++
            })
        }
        localStorage.setItem("cart", JSON.stringify(this.cart))
        toastProductAddToCart(product.name)
    }

    increaseQuantity(product){
        const index = this.cart.findIndex(productItem => productItem.product.id === product.id);
        if(index === -1){
            this.cart.push({product: product, quantity: 1})
        }
        else {
            console.log(this.cart[index].quantity)
            runInAction(() => {
                this.cart[index].quantity++
            })
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(this.cart))
        }
    }

    increaseQuantityOnCount(product, quantity){
        const index = this.cart.findIndex(productItem => productItem.product.id === product.id);
        if(index === -1){
            this.cart.push({product: product, quantity: quantity})
        }
        else {
            console.log(this.cart[index].quantity)
            runInAction(() => {
                this.cart[index].quantity += quantity;
            })
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(this.cart))
        }
    }

    decreaseQuantity(product){
        const index = this.cart.findIndex(productItem => productItem.product.id === product.id);
        console.log(this.cart[index].quantity)
        if(this.cart[index].quantity === 1){
            this.removeProductFromCart(product)
        }
        else {
            runInAction(() => {
                this.cart[index].quantity--
            })
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(this.cart))
        }
    }

    decreaseQuantityOnCount(product, quantity){
        const index = this.cart.findIndex(productItem => productItem.product.id === product.id);
        if(index === -1){
            this.cart.push({product: product, quantity: quantity})
        }
        else {
            console.log(this.cart[index].quantity)
            runInAction(() => {
                this.cart[index].quantity -= quantity;
            })
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(this.cart))
        }
    }

    removeProductFromCart(product){
        runInAction(() => {
            this.cart = this.cart.filter(productItem => productItem.product !== product)
        })
        if(this.cart.length <= 0 ){
            localStorage.removeItem("cart")
        }
        else{
            localStorage.removeItem("cart")
            localStorage.setItem("cart", JSON.stringify(this.cart))
        }
        toastProductRemoveFromCart(product.title)
    }

    setCart(cart){
        this.cart = cart
    }

    get getAmount(){
        let amount = 0;
        this.cart.map(productItem => {
            amount += productItem.product.price * productItem.quantity;
        })
        return amount
    }
}

export default new OrdersStore();
