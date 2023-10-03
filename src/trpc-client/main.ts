import { api } from './api'

const data = await api.ping.query()

console.log(data)
