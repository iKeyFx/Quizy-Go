import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        /> */}
        <GlobalStyles />
        <AppLayout />
      </QueryClientProvider>
    </>
  );
}

export default App;
