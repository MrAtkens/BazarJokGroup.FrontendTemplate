import {
    toastServerError,
    toastUnauthorizedError,
    toastAuthError,
    toastUserNotFound,
    toastAuthorizationSuccess,
    toastRegistrationSuccess,
    toastRegistrationError,
    toastEditSuccess,
    toastProductNotFound,
    toastBuySuccess, toastProductAddToWishList, toastProductRemoveFromWishList
} from './toastify'

import Router from 'next/router';
import {toastProductAddToCompareList} from "~/utilities/toastify";


export const authorizationStatusValidation = (status) => {
    if (status === 200)
        toastAuthorizationSuccess()
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 401)
        toastAuthError()
}

export const registrationStatusValidation = (status) => {
    if (status === 200)
        toastRegistrationSuccess()
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 401)
        toastRegistrationError()
}

export const userGetDataStatus = (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}

export const userEditStatus = (status) => {
    if(status === 200)
        toastEditSuccess()
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}

export const userBuy = (status) => {
    if(status === 200)
        toastBuySuccess()
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastUserNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}

export const productGet = (status) => {
    if(status === 500)
        toastServerError()
    else if (status === 404)
        toastProductNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}

export const productAddToWishList = (status, title) => {
    if(status === 200)
        toastProductAddToWishList(title)
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastProductNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}

export const productRemoveFromWishList = (status, title) => {
    if(status === 200)
        toastProductRemoveFromWishList(title)
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastProductNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}



export const productAddToCompareList = (status, title) => {
    if(status === 200)
        toastProductAddToCompareList(title)
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastProductNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}

export const productRemoveFromCompareList = (status, title) => {
    if(status === 200)
        toastProductRemoveFromWishList(title)
    else if(status === 500)
        toastServerError()
    else if (status === 404)
        toastProductNotFound()
    else if (status === 401) {
        toastUnauthorizedError()
        localStorage.removeItem('jwt_token');
        Router.push("/account/login")
    }
}
