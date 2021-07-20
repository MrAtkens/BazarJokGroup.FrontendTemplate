import { makeAutoObservable, runInAction } from "mobx";

import { productsService } from "API";
import { getProducts } from "utilities/product";
import { productGet } from 'utilities/responseStatus'

class ProductsStore {
    products = [];
    newProducts = [];
    popularProducts = [];
    saleProducts = [];
    findProducts = [];

    product = {};

    isLoading = false;
    isLoadingCategory = false;
    isLoadingCategorySearch = false;
    isLoadingSearch = false;
    isLoadingProduct = false;
    error = "";
    id = "";
    countOfProducts = 0;
    currentPage = 1;
    pageSize = 12;

    statusCode = 0

    constructor() {
        makeAutoObservable(this)
    }

    // @ts-ignore
    async getProducts(){
        // const response = await productsService.getProductsApiPagination(this.pageSize, this.currentPage);
        //
        // if(response.status === 200){
        //     runInAction(() => {
        //         this.products = response.data
        //     })
        //     this.isLoading = true
        //     console.log(this.products)
        // }

        runInAction(() => {
            this.products = getProducts("decor", "new", 9)
        })
        this.isLoading = true
    }

    async getNewProducts(){
        runInAction(() => {
            this.newProducts = getProducts("decor", "new", 9)
        })
        this.isLoading = true
    }

    async getPopularProducts(){
        runInAction(() => {
            this.popularProducts = getProducts("decor", "popular", 9)
        })
        this.isLoading = true
    }

    async getSaleProducts(){
        runInAction(() => {
            this.saleProducts = getProducts("decor", "sale", 9)
        })
        this.isLoading = true
    }


    async getProductsByCategory(categoryId){
        const response = await productsService.getProductsApiPaginationByCategory(this.pageSize, this.currentPage, categoryId);
        if(response.status === 200){
            runInAction(() => {
                this.products = response.data
            })
            this.isLoadingCategory = true
        }
    }

    async getProductsByCategorySearch(categoryId, text){
        const response = await productsService.getProductsByIdSearch(categoryId, text);
        console.log(response)
        if(response.status === 404){
            this.isLoadingCategorySearch = true
        }
        if(response.status === 200){
            runInAction(() => {
                this.findProducts = response.data
                this.statusCode = response.status
            })
        }
    }

    async getProductsPaginationByCategorySearch(categoryId, text){
        const response = await productsService.getProductsApiPaginationByIdSearch(categoryId, text, this.pageSize, this.currentPage);
        console.log(response)
        this.statusCode = response.status;
        if(response.status === 404){
            this.isLoadingCategorySearch = true
        }
        if(response.status === 200){
            runInAction(() => {
                this.findProducts = response.data
                this.statusCode = response.status
            })
            this.isLoadingCategorySearch = true
        }
    }

    // @ts-ignore
    async getCountOfProductsAPI(){
        const response = await productsService.getProductsCount()
        console.log(response)
        this.countOfProducts = response.data
    }

    async getCountOfProductsCategoryApi(categoryId){
        const response = await productsService.getProductsCountApiByCategory(categoryId)
        console.log(response)
        this.countOfProducts = response.data
    }

    async getProductsCountApiByCategoryIdAndText(categoryId, keyWord){
        const response = await productsService.getProductsCountApiByCategoryIdAndText(categoryId, keyWord)
        console.log(response)
        this.countOfProducts = response.data
    }

    async getProductById(id){
        const response = await productsService.getProductByIdApi(id);
        console.log("Get product by id")
        console.log(response)
        productGet(response.status)
        if(response.status === 404){
            this.statusCode = response.status
            this.isLoadingProduct = true
        }
        else if(response.status === 200) {
            runInAction(() => {
                this.setProduct(response.data)
            })
            this.isLoadingProduct = true
        }
    }

    async paginationChange(data){
        console.log(data)
        this.currentPage = data;
        console.log(this.currentPage)
        await this.getProducts()
    };

    async paginationChangeCategory(data, categoryId){
        console.log(data)
        this.currentPage = data;
        console.log(this.currentPage)
        await this.getProductsByCategory(categoryId)
    };

    // @ts-ignore
    get getCountOfProducts(){
        return this.countOfProducts
    }

    // @ts-ignore
    get getProductsTable() {
        return this.products;
    }

    get getProduct(){
        return this.product
    }

    get isLoadingGet(){
        return this.isLoading
    }


    async setPageSize(pageSize){
        this.currentPage = 1;
        this.pageSize = pageSize
        await this.getProducts()
    }

    setProduct(product){
        this.product = product
    }
}

export default new ProductsStore();
