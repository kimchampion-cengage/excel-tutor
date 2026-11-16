import { createHashRouter } from "react-router";
import Main from "./Main";
import CompletionPage from "./pages/CompletionPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Main,
  },
  {
    path: "/completion",
    Component: CompletionPage,
  },
]);
