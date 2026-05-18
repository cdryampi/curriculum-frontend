import useApi from "./useApi";
import { fetchStaticPage } from "../api";

const useFetchStaticPage = (slug) => useApi(() => fetchStaticPage(slug), [slug]);

export default useFetchStaticPage;
