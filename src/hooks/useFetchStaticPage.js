import useApiWithCache from "./useApiWithCache"
import { fetchStaticPage } from "../api"

const useFetchStaticPage = (slug) =>
  useApiWithCache(`staticPage:${slug}`, () => fetchStaticPage(slug), [slug])

export default useFetchStaticPage
