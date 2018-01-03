export const isDefined = val => typeof val !== 'undefined'
export const generateUUID = () => `${Math.floor(Math.random()*10000000000)}`
export const formatAsArray = (data) => data && !Array.isArray(data) ? [data] : data