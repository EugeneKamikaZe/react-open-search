import { Suspense } from "react";

import { AppRouter } from "~/app/providers/router";

import s from "./App.module.scss";

const App = () => {
  return (
    <Suspense fallback="">
      <div className={s.page}>
        <AppRouter />
      </div>
    </Suspense>
  );
};

export default App;
