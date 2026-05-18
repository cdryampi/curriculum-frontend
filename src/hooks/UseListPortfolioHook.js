import useApi from "./useApi";
import { fetchPortfolioList } from "../api";

const usePortfolioList = () => useApi(fetchPortfolioList);

export default usePortfolioList;
