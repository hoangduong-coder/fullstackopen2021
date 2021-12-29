import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources([...response.data])
  }

  useEffect(() => {
    getAll()
  }, [])
  
  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource