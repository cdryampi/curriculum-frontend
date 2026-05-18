import useApi from "./useApi";
import { fetchSocialLinks } from "../api";

const useSocialLinks = () => useApi(fetchSocialLinks);

export default useSocialLinks;
