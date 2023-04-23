import React from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
    },
  },
});

import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </NavigationContainer>
    </React.Fragment>
  );
}
