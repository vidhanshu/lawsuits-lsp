import React, { useContext } from 'react'
import { UserContext } from './UserContext'

const useUserContext = () => {
    const data = useContext(UserContext)
    if (!data) {
        throw new Error('use UserContext cannot be used here')
    }
    return data;
}

export default useUserContext