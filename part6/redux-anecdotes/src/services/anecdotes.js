import axios from "axios"
const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createNew = async (content) => {
    const object = { content, id: getId(), votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id) => {
    const object = await axios.get(`${baseUrl}/${id}`)
    const newObject = {
      ...object.data,
      votes: object.data.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export default { getAll, createNew, update }