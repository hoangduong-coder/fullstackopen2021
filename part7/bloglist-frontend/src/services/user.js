/* eslint-disable indent */
import axios from "axios"
const baseUrl = "/api/users"

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const signUp = async (newUser) => {
    const res = await axios.post(baseUrl, newUser)
    return res.data
}

export default { getAll, signUp }