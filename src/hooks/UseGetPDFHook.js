import useApi from "./useApi";
import { fetchUserPDF } from "../api";

const usePDF = () => useApi(fetchUserPDF);

export default usePDF;
