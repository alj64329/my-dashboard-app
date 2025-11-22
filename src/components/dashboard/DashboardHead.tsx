import Image from 'next/image'
import defaultImg from '../../../public/default/default-user-img.jpg'

const DashboardHead = () => {
  return (
    <div className='flex justify-between items-center'>
        <div
        className='text-xl'>
            Dashboard</div>

        <div>
           <Image
           src={defaultImg}
           width={40}
           height={40}
           alt="Default Account Image"
           className='rounded-[50%]'/>
        </div>
    </div>
  )
}

export default DashboardHead