import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components";
import { PageContainer } from "./pages";

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PageContainer />
      </ErrorBoundary>
    </>
  );
}

export default App;
