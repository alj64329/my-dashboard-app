import { PropsMenuType } from '@/src/types/dashboard.types'
import { faAddressBook, faBuilding, faFolderOpen, faHouse } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminNav = ({type}:PropsMenuType) => {
  return (
        <ul className={`flex flex-col gap-10 ${type==="desktop"&&'text-white'}`}>
            <li className='flex items-center gap-4'>
                <FontAwesomeIcon icon={faHouse} />
                <div>Dashboard</div>
            </li>
                <li className='flex items-center gap-4'>
                <FontAwesomeIcon icon={faAddressBook} />
            <div>Employees</div>
            </li>
            <li className='flex items-center gap-4'>
                <FontAwesomeIcon icon={faFolderOpen} />
                <div>Projects</div>
            </li>
            <li className='flex items-center gap-4'>
                <FontAwesomeIcon icon={faBuilding} />
                <div>Comapny Account</div>
            </li>
        </ul>
  )
}

export default AdminNav