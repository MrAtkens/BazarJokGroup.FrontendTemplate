import axios from 'axios'
import { URLAuth } from '../settings'
axios.defaults.withCredentials = true

const sendMail = async (firstName, email, message) => {
  return await axios.post(`${URLAuth}/api/system`, {
    firstName: firstName,
    email: email,
    message: message,
  }).then(response => {
    console.log(response)
    return response
  }).catch(error => {
    return error.response
  })
}


export const systemService = {
  sendMail,
};
