import { faCalendar, faFolderOpen, faHouse, faListAlt } from '@fortawesome/free-regular-svg-icons'
import { faListCheck,faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const EmployeeNav = () => {
  return (
    <ul className='flex flex-col gap-10'>
        <li className='flex text-white items-center gap-4'>
            <FontAwesomeIcon icon={faHouse} />
            <div>Dashboard</div>
        </li>
            <li className='flex text-white items-center gap-4'>
            <FontAwesomeIcon icon={faFolderOpen} />
            <div>Projects</div>
        </li>
        <li className='flex text-white items-center gap-4'>
            <FontAwesomeIcon icon={faListCheck} />
            <div>Tasks</div>
        </li>
        <li className='flex text-white items-center gap-4'>
            <FontAwesomeIcon icon={faCalendar} />
            <div>Leave History</div>
        </li>
        <li className='flex text-white items-center gap-4'>
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
            <div>Expense Request</div>
        </li>
    </ul>
  )
}

export default EmployeeNav