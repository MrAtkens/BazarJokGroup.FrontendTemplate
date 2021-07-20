import {toast} from 'react-hot-toast';

//Errors Toast
//Status 500 Iternal Server Error
export const toastServerError = () => {
    toast.error("Ошибка 500, на данный момент на стороне сервера ошибка, пожалуйста повторите попытку позже",
        {
            duration: 5000
        });
}

//Status 409 Conflict(Login occuped)
export const toastLoginOccuped = () => {
    toast.error("Ошибка 409, данный пользователь уже зарегистрирован",
        {
            duration: 5000
        });
}
//Status 404
export const toastUserNotFound = () => {
    toast.error("Ошибка 404, данный пользователь не найден",
        {
            duration: 5000
        });
}

export const toastProductNotFound = () => {
    toast.error("Ошибка 404, данный товар не найден",
        {
            duration: 5000
        });
}
//Status 403
export const toastRoleError = () => {
    toast.error("Ошибка 409, у вас не достаточно прав на данное действие",
        {
            duration: 5000
        });
}
//Status 401
export const toastAuthError = () => {
    toast.error("Вы неверно ввели логин или пароль",
        {
            duration: 5000
        });
}

export const toastUnauthorizedError = () => {
    toast.error("Вы не аутентифицированы, для выполнения этих действий вам надо зайти в систему",
        {
            duration: 5000
        });
}
// warn
export const toastRegistrationError = () => {
    toast.error("Ошибка регистраций, данный номер уже зарегистрирован",
        {
            duration: 5000
        });
}

export const toastWishListIsProduct = () => {
    toast("Данный продукт уже пресутствует в вашем списке избранных",
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}

export const toastCompareListIsProduct = () => {
    toast("Данный продукт уже пресутствует в вашем списке сравнений",
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}


// info
export const toastProductAddToCart = (title) => {
    toast(`Вы добавили товар под названием ${title}, в вашу корзину`,
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}

export const toastProductRemoveFromCart = (title) => {
    toast(`Вы удалили товар под названием ${title}, из вашей корзины`,
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}

export const toastProductAddToWishList = (title) => {
    toast(`Вы добавили товар под названием ${title}, в ваш список избранных`,
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}

export const toastProductRemoveFromWishList = (title) => {
    toast(`Вы удалили товар под названием ${title}, из вашего списка избранных`,
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}

export const toastProductAddToCompareList = (title) => {
    toast(`Вы добавили товар под названием ${title}, в ваш список сравнений`,
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}

export const toastProductRemoveFromCompareList = (title) => {
    toast(`Вы удалили товар под названием ${title}, из вашего списка сравнений`,
        {
            duration: 5000,
            icon: 'ℹ️'
        });
}

//Status 200
export const toastAuthorizationSuccess = () => {
    toast.success('Вы успешно вошли в систему',
        {
            duration: 5000,
        });
}

export const toastRegistrationSuccess = () => {
    toast.success('Вы успешно зарегистрировались',
        {
            duration: 5000,
        });
}

export const toastBuySuccess = () => {
    toast.success('Вы успешно создали заказ',
        {
            duration: 5000,
        });
}

export const toastEditSuccess = () => {
    toast.success('Вы успешно изменили свой данные',
        {
            duration: 5000,
        });
}
