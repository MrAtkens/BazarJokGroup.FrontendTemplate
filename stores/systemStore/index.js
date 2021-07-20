import {makeAutoObservable} from "mobx";
import Router from 'next/router';

import {accountService, authenticationService} from "API";
import {
    authorizationStatusValidation,
    registrationStatusValidation,
    userEditStatus,
    userGetDataStatus
} from 'utilities/responseStatus'

class SystemStore {
    isAuthenticated = false
    isSubmitting = false
    user = {
        id: "",
        phone: "",
        firstName: "",
        lastName: "",
        email: "",
        code: ""
    }

    constructor() {
        makeAutoObservable(this)
    }

    async authenticate(phone, password){
        const response = await authenticationService.userSingInApi(phone, password);
        console.log(response)
        authorizationStatusValidation(response.status)
        if(response.status === 200){
            localStorage.setItem('jwt_token', response.data);
            await this.getUserData()
            this.isSubmitting = false;
            Router.push("/")
        }
        else{
            this.isSubmitting = false
        }

    }

    async registration(phone, firstName, lastName, password){
        const response = await authenticationService.userSingUpApi(phone, firstName, lastName, password);
        console.log(response)
        registrationStatusValidation(response.status)
        if(response.status === 200){
            Router.push("/account/login")
        }
        else{
            this.isSubmitting = false
            return false;
        }
    }

    async getUserData(){
        const response = await accountService.userGetData();
        console.log(response)
        userGetDataStatus(response.status)
        if(response.status === 200) {
            this.setUser(response.data.id, response.data.phoneNumber, response.data.firstName, response.data.lastName, response.data.email)
            this.setIsAuth(true);
        }
        else{
            localStorage.removeItem('jwt_token');
            this.setIsAuth(false);
        }
    }

    async getTelegramCode(){
        const response = await accountService.userGetTelegramCode(this.user.id);
        console.log(response)
        if(response.status === 200) {
            this.setCode(response.data)
        }
    }

    async singOut(){
        localStorage.removeItem('jwt_token');
        this.setIsAuth(false);
        window.location.href = "/"
    }

    async userEdit(firstName, lastName, email, password){
        const response = await accountService.userEditApi(firstName, lastName, email, password)
        console.log(response)
        userEditStatus(response.status)
        if(response.status === 200) {
            await this.getUserData()
        }
    }

    setId(id){
        this.user.id = id
    }

    setIsAuth(auth){
        this.isAuthenticated = auth
    }

    setUser(id, phone, firstName, lastName, email){
        this.user.id = id
        this.user.phone = phone
        this.user.firstName = firstName
        this.user.lastName = lastName
        this.user.email = email
    }

    setCode(code){
        this.user.code = code
    }

    get getAuthenticated(){
        return this.isAuthenticated
    }

    get showFirstLastName(){
        console.log(this.user.lastName)
        return this.user.lastName + " " + this.user.firstName
    }

    get showPhoneNumber(){
        return this.user.phone
    }

    get isSub(){
        return this.isSubmitting
    }

    get getCode(){
        return this.user.code
    }

    get countOfOptions(){
        return [
            {name: "4 продукта", value: 4, id: 1},
            {name: "8 продуктов", value: 8, id: 2},
            {name: "12 продуктов", value: 12, id: 3},
            {name: "16 продуктов", value: 16, id: 4},
        ]
    }
}

export default new SystemStore();
