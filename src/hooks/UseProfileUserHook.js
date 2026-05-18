import useApi from "./useApi";
import { fetchUserProfile } from "../api";

const useUserProfile = () => useApi(fetchUserProfile);

export default useUserProfile;
