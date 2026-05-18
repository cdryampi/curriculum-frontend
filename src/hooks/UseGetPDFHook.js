import useApiWithCache from "./useApiWithCache"
import { fetchUserPDF } from "../api"

const usePDF = () => useApiWithCache("userPDF", fetchUserPDF)

export default usePDF
