import React, {useState, useEffect} from 'react'
import Router from 'next/router'

const ClientOnly = ({children}) => {
    const [domLoaded, setDomLoaded] = useState(false);
    useEffect(() => {
		setDomLoaded(true);

	}, []);

    if(!domLoaded) return <div></div>
    return (
        <>{children}</>
    )
}

export default ClientOnly