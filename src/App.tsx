import { Route, RouteDefinition, Routes, useRoutes } from "@solidjs/router";
import { Component, lazy } from "solid-js";
import { Header } from "./components/header";

const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/home")),
  },
  {
    path: "/collection/:id",
    component: lazy(() => import("./pages/collections")),
    children: [
      {
        path: "/",
        component: lazy(() => import("./pages/collection")),
      },
    ],
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <div h-screen w-full>
      <Header />
      <div w-full class="overflow-overlay">
        <Routes />
      </div>
    </div>
  );
};

export default App;
