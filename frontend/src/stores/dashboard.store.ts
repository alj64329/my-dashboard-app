import {create} from 'zustand'
import { User } from '../types/index.types'
import { ProjectDisplayType } from '../app/(dashboard)/admin/projects/[id]/page'


interface DashboardStore{
    teamList:ProjectDisplayType | null
    setTeamList:(data:ProjectDisplayType|null)=>void
}

export const useDashboard = create<DashboardStore>((set, get)=>({
    // sotore for a project teammates list
    teamList: null,
    setTeamList:(data:ProjectDisplayType|null)=>{
        set(({teamList:data}))
    }

}))