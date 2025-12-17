import type { Component } from "solid-js";
import LandingPage from "./pages/LandingPage";
import styles from "./App.module.css";
import { WrappedProvider } from "./providers/wrappedContext";
const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <WrappedProvider>
          <LandingPage></LandingPage>
        </WrappedProvider>
      </header>
    </div>
  );
};

export default App;