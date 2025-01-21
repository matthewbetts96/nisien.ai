import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DrinkRunProvider } from "context/DrinkRunContext";
import AppRoutes from "routes/AppRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DrinkRunProvider>
        <AppRoutes />
      </DrinkRunProvider>
    </QueryClientProvider>
  );
}

export default App;
