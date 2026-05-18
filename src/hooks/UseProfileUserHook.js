import useApiWithCache from "./useApiWithCache"
import { fetchUserProfile } from "../api"

const useUserProfile = () => useApiWithCache("userProfile", fetchUserProfile)

export default useUserProfile
