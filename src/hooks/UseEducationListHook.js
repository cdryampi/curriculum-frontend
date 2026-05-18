import useApi from "./useApi";
import { fetchEducationList } from "../api";

const useEducationList = () => useApi(fetchEducationList);

export default useEducationList;
