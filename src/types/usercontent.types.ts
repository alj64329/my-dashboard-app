import { Models } from "appwrite"

export interface UserContentType{
    loggedInUser:Models.User<any> |null,
    setLoggedInUser: React.Dispatch<React.SetStateAction<Models.User<any> | null>>
}