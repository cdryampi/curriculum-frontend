import useApi from "./useApi";
import { fetchServicesList } from "../api";

const useServicesList = () => useApi(fetchServicesList);

export default useServicesList;
