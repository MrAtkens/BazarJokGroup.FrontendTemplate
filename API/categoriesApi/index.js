import axios from 'axios'
import { URLBlog } from '../settings'

axios.defaults.withCredentials = true

const getCategoriesApi = async () => {
    return await axios.get(`${URLBlog}/api/categories`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        return response
    }).catch(error => {
        return error.response
    })
}

const getCategoryByIdApi = async (id) => {
    return await axios.get(`${URLBlog}/api/categories/${id}`, {headers:
            { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }}).then(response => {
        return response
    }).catch(error => {
        return error.response
    })
}

export const categoriesService = {
    getCategoriesApi,
    getCategoryByIdApi,

};
