const { useEffect, useState } = React

export function useFetch(url) {
    const [value, setValue] = useState()
    const [isFetching, setIsFetching] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        setIsFetching(true)
        fetch(url)
            .then(res => res.json())
            .then(value => setValue(value))
            .catch(err => setError(err))
            .finally(() => setIsFetching(false))
    }, [])


    return { value, isFetching, error }
}