import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faBuilding, faFolderOpen, faHouse } from '@fortawesome/free-regular-svg-icons'
import { logout } from '@/src/features/auth/auth.features'
const Sidebar = () => {
  const companyName="Company A"

  return (
    <aside className='sidebar bg-main-green h-[100vh] w-[65%] min-w-[250px] sm:w-[20%] max-w-[280px]'>
        <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center items-center p-8 border-b border-[#BDBDBD]">
                <div className='w-[60px] h-[60px] bg-amber-300 rounded-[50%]'></div>
                <div
                className="pt-6 text-white text-[14px]">{companyName}</div>
            </div>

            <div className="w-full px-8 pt-15 pb-8 flex flex-col min-h-[73vh] justify-between">
              {/* Admin */}
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

              <div className='flex justify-center'>
                <button 
                className="bg-second-green py-3 px-12 rounded-2xl text-white font-karla font-bold cursor-pointer"
                onClick={logout}>
                  Log out</button>
              </div>
            </div>
        </div>

    </aside>
  )
}

export default Sidebar