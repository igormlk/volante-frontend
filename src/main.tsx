import ReactDOM from "react-dom/client";
import {  QueryClientProvider } from '@tanstack/react-query'
import App from "./App";
import './globals.css'
import { queryClient } from "./lib/react-query";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  // </React.StrictMode>,
);
