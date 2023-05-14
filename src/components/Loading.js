import { Spinner } from '@material-tailwind/react'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" />
    </div>
  )
}

export default Loading