import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { App } from "./app";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root")!);
export const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  // </React.StrictMode>,
);

reportWebVitals();
