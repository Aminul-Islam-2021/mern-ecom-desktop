import React from 'react'
import toast from 'react-hot-toast';

const Home = () => {
  const handleClick = () => {
    toast.success('Product added successfully!');
    toast.error('This is an error toast!');
  };
  return (
    <div>
      Home

      <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded">Click here</button>
    </div>
  )
}

export default Home
