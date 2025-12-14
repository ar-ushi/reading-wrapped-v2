import type { Component } from "solid-js";
import { Heading, Dropdown } from "../components/ui";
import styles from "./App.module.css";
import UploadBox from "../components/UploadBox";
import HowTo from "../components/HowTo";
const LandingPage: Component = () => {
  return (
    <div class="min-h-screen flex flex-col justify-center items-center px-4 gap-3 ">
      <Heading variant="h1" class="text-primary" compact>
        Your Year in Books
      </Heading>
      <Heading variant="h6" class="text-secondary mt-0 leading-snug">
        Generate your personalized reading recap for
        <Dropdown
          range={{ from: 2010, to: 2025 }}
          class="
      inline-flex
      items-center
      ml-2
      px-3 py-1
      text-sm
      align-middle
    "
        />
      </Heading>

      <UploadBox></UploadBox>
      <hr></hr>
      <HowTo></HowTo>
    </div>
  );
};

export default LandingPage;
