import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const API_URL = import.meta.env.VITE_APP_BASE_URL

const baseQuery = fetchBaseQuery({baseUrl:API_URL + "/api"})

const apiSlice = createApi({
    baseQuery,
    tagTypes:[],
    endpoints:(builder) => ({})
})

export default apiSlice