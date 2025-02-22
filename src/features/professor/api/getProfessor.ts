import fetcher from "@/utils/fetcher"
import { ProfessorResponse, Professor } from "../types"

export const getProfessor = async (universitiesUuid: string, professorsUuid: string) => {
 return fetcher<ProfessorResponse, Professor>(`/v1/universities/${universitiesUuid}/professors/${professorsUuid}`)
}