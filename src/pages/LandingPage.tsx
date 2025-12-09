import type { Component } from "solid-js";
import { Heading, Dropdown } from "../components/ui";
import styles from "./App.module.css";

const LandingPage: Component = () => {
  return (
    <div class="px-4 gap-3 pt-10">
      <Heading variant="h1" class="text-primary" compact>
        Your Year in Books
      </Heading>
      <Heading variant="h6" class="text-secondary mt-0" compact>
        Generate your personalized reading recap.
      </Heading>
      <Dropdown
        label={<span>Select Year</span>}
        range={{ from: 2010, to: 2025 }}
      ></Dropdown>
    </div>
  );
};

export default LandingPage;
