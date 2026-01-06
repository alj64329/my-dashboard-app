'use client'

import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const EventCard = () => {
  return (
    <div className='box-shadow h-fit mt-6 rounded-2xl'>
        <div className='p-4'>
            <div className="text-grey-900 font-bold text-xl">
                Upcoming Events</div>
            <div className="flex flex-col pt-4">
                <div className="flex justify-between p-4 border-b border-grey-100 font-light">
                    <FontAwesomeIcon icon={faCalendar}/>
                    <div>Nov 12</div>
                    <div>Vacation</div>
                </div>
                <div className="flex justify-between p-4 pb-6 font-light">
                    <FontAwesomeIcon icon={faCalendar}/>
                    <div>Nov 12</div>
                    <div>Vacation</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventCard