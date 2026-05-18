import useApiWithCache from "./useApiWithCache"
import { fetchSocialLinks } from "../api"

const useSocialLinks = () => useApiWithCache("socialLinks", fetchSocialLinks)

export default useSocialLinks
