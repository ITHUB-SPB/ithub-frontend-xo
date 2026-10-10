import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import "./index.css";
// import App from "./App.tsx";
import { GameContext } from "./context.tsx";

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <GameContext>
      <App />
    </GameContext> */}
  </StrictMode>,
);
