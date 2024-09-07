import React from 'react'

const Loader:React.FC = () => {
  return (
    <div className="absolute inset-0  flex items-center justify-center bg-black/50 z-50">
    <div className="spinner"></div>
  </div>
  )
}

export default Loader
