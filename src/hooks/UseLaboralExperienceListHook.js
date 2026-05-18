import useApiWithCache from "./useApiWithCache"
import { fetchLaboralExperience } from "../api"

const useLaboralExperience = () => useApiWithCache("workExperience", fetchLaboralExperience)

export default useLaboralExperience
