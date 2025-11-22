import { RequestBtnType } from "@/src/types/dashboard.types"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const RequestBtn = ({requestType}:RequestBtnType) => {
  return (
    <div className="rounded-2xl bg-[rgba(176,224,230,0.5)] p-5">
        <div className="flex justify-center items-center gap-[0.8rem] cursor-pointer">
            <FontAwesomeIcon icon ={faPlus} />
            <div>{requestType[0].toUpperCase() + requestType.slice(1)} Request</div>
        </div>
    </div>
  )
}

export default RequestBtn