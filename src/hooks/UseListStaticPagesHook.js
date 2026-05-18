import useApiWithCache from "./useApiWithCache"
import { fetchStaticPages } from "../api"

const useStaticPages = () => useApiWithCache("staticPages", fetchStaticPages)

export default useStaticPages
