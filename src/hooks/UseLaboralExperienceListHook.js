import useApi from "./useApi";
import { fetchLaboralExperience } from "../api";

const useLaboralExperience = () => useApi(fetchLaboralExperience);

export default useLaboralExperience;
