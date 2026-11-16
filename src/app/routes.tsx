import { createBrowserRouter } from "react-router";
import Main from "./Main";
import CompletionPage from "./pages/CompletionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
  },
  {
    path: "/completion",
    Component: CompletionPage,
  },
]);
