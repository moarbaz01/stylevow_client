import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import routes from "./RouteData";

// Import your skeleton component
import SkeletonFallback from "../components/SkeletonFallback";

const Router = () => {
  return (
    <Suspense >
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>
                  <route.component />
                </ProtectedRoute>
              ) : (
                <route.component />
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
