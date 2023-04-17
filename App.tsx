import React from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import Router from "./Router";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </NavigationContainer>
    </React.Fragment>
  );
}
