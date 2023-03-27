import React, {useState} from 'react'

const useUser = () => {
    const [user, setUser] = useState(typeof window === "undefined" ? null : JSON.parse(localStorage.getItem('user')))

    return user;
}

export default useUser