import React from 'react'

const SumCard = () => {
  return (
    <div 
    className='p-5 flex flex-col gap-5 rounded-2xl bg-[rgba(176,224,230,0.5)] w-fit max-w-[200px] sm:max-w-[250px]'>
        <div className='text-2xl sm:text-3xl'>3</div>
        <div className='text-sm sm: text-md'>
            Employees on Leave Today
        </div>

    </div>
  )
}

export default SumCard