import Image from 'next/image'
import defaultImg from '../../../public/default/default-user-img.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const DashboardHead = () => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-6 items-center'>
        <FontAwesomeIcon 
        icon ={faBars} />
        <div
        className='text-xl'>
            Dashboard</div>
      </div>
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