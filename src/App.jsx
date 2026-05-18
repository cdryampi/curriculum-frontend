import ErrorBoundary from "./components/ErrorBoundary";
import RouterLinks from "./router/Routes";

function App() {
  return (
    <ErrorBoundary>
      <RouterLinks />
    </ErrorBoundary>
  );
}

export default App;
