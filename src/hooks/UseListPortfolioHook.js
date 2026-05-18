import useApiWithCache from "./useApiWithCache"
import { fetchPortfolioList } from "../api"

const usePortfolioList = () => useApiWithCache("portfolio", fetchPortfolioList)

export default usePortfolioList
