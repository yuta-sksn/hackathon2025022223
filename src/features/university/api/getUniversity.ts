import fetcher from "@/utils/fetcher"
import { UniversityResponse, University } from "../types"

export const getUniversity = async (uuid: string) => {
 return fetcher<UniversityResponse, University>(`/v1/universities/${uuid}`)
}