import useApiWithCache from "./useApiWithCache"
import { fetchServicesList } from "../api"

const useServicesList = () => useApiWithCache("services", fetchServicesList)

export default useServicesList
