import useApi from "./useApi";
import { fetchStaticPages } from "../api";

const useStaticPages = () => useApi(fetchStaticPages);

export default useStaticPages;
