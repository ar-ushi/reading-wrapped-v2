import type { Component } from 'solid-js';
import LandingPage from './pages/LandingPage';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
      <LandingPage></LandingPage>
      </header>
    </div>
  );
};

export default App;
