
import TablePageClient from "../components/TablePageClient"
import { columns } from "./columns"


const page = () => {

  const pageTitle ="Leave Request"
  const endpoint="leave-requests"

  return (
    <div
    className="py-5 px-6 lg:px-10">
      <TablePageClient title={pageTitle} endpoint={endpoint} columns={columns}/>
    </div>
  )
}

export default page