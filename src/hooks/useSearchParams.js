import { useSearchParams } from 'react-router-dom'

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const toObject = (keys) => {
    if (!keys) return Object.fromEntries([...searchParams])
    if (typeof keys === 'string') return { [keys]: searchParams.get(keys) }
    if (Array.isArray(keys)) {
      const entries = keys.map(k => [k, searchParams.get(k)])
      return Object.fromEntries(entries)
    }
    return {}
  }

  const getParam = (keys) => toObject(keys)

  const setParam = (params) => {
    const newParams = new URLSearchParams(searchParams)
    for (const key in params) {
      if (params[key] === null || params[key] === undefined) {
        newParams.delete(key)
      } else {
        newParams.set(key, params[key])
      }
    }
    setSearchParams(newParams)
  }

  const removeParam = (keys) => {
    const newParams = new URLSearchParams(searchParams)
    const keyList = Array.isArray(keys) ? keys : [keys]
    keyList.forEach(key => newParams.delete(key))
    setSearchParams(newParams)
  }

  const getAllParams = () => Object.fromEntries([...searchParams])

  return {
    getParam,
    setParam,
    removeParam,
    getAllParams,
  }
}


// example:

// const { getParam, setParam, removeParam, getAllParams} = useQueryParams()
  
//   // Get a specific param
//   const { view } = getParam('view')
  
//   // Get multiple
//   const { sort, filter } = getParam(['sort', 'filter'])
  
//   // Set one or many
//   setParam({ page: 3, view: 'grid' })
  
//   // Remove one or many
//   removeParam(['filter', 'page'])
  
//   // Get all current params
//   const params = getAllParams()
  