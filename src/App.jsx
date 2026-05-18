import { HelmetProvider } from "react-helmet-async"
import ErrorBoundary from "./components/ErrorBoundary"
import RouterLinks from "./router/Routes"

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <RouterLinks />
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
