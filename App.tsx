import React from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import Routes from "./src/Routes";
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
