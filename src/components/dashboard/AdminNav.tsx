import { faAddressBook, faBuilding, faFolderOpen, faHouse } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminNav = () => {
  return (
        <ul className='flex flex-col gap-10'>
            <li className='flex text-white items-center gap-4'>
                <FontAwesomeIcon icon={faHouse} />
                <div>Dashboard</div>
            </li>
                <li className='flex text-white items-center gap-4'>
                <FontAwesomeIcon icon={faAddressBook} />
            <div>Employees</div>
            </li>
            <li className='flex text-white items-center gap-4'>
                <FontAwesomeIcon icon={faFolderOpen} />
                <div>Projects</div>
            </li>
            <li className='flex text-white items-center gap-4'>
                <FontAwesomeIcon icon={faBuilding} />
                <div>Comapny Account</div>
            </li>
        </ul>
  )
}

export default AdminNav