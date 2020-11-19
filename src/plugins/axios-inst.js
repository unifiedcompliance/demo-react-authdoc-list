import axios from 'axios'

const customHeaders = {
  "x-rapidapi-host": `${process.env.APP_API_HOST}`,
  "x-rapidapi-key": process.env.APP_API_KEY,
  "useQueryString": true
}

const instance = axios.create({
  baseURL: process.env.APP_API_BASE_URL,
  headers: customHeaders
})

export default instance