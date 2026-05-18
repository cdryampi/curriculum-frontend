import useApiWithCache from "./useApiWithCache"
import { fetchEducationList } from "../api"

const useEducationList = () => useApiWithCache("education", fetchEducationList)

export default useEducationList
