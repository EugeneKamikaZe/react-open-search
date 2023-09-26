import React from "react";
import { useNavigate } from "react-router-dom";

import { getRouteMain } from "~/shared/const/router";

export const NotFound = () => {
  const navigate = useNavigate();
  const handleNavigateToMain = () => {
    navigate(getRouteMain());
  };

  return (
    <div>
      <h1>404</h1>

      <button onClick={handleNavigateToMain}>Back</button>
    </div>
  );
};
