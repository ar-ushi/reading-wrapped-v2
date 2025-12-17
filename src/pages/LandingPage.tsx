import type { Component } from "solid-js";
import { Show } from "solid-js";
import { Heading, Dropdown } from "../components/ui";
import styles from "./App.module.css";
import UploadBox from "../components/UploadBox";
import HowTo from "../components/HowTo";
import { useWrappedSession } from "../providers/wrappedContext";
import { buildWrapped } from "../helpers/buildWrapped";

const LandingPage: Component = () => {
  const { state, setState } = useWrappedSession();
  function handleGenerate() {
    buildWrapped(state.year, state.file);
  }
  return (
    <div class="min-h-screen flex flex-col justify-center items-center px-4 gap-3 ">
      <Heading variant="h1" class="text-primary" compact>
        Your Year in Books
      </Heading>
      <Heading variant="h6" class="text-secondary mt-0 leading-snug">
        Generate your personalized reading recap for
        <Dropdown
          range={{ from: 2010, to: 2025 }}
          value={state.year ?? ""}
          onChange={(e) => setState({ year: Number(e.currentTarget.value) })}
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

      <UploadBox
        onFileSelect={(file: File) => {
          setState({ file });
        }}
      ></UploadBox>
      <div class="mt-6 flex justify-center">
        <Show when={state.file}>
          <button
            class="
              px-6 py-3
              rounded-full
              bg-primary
              text-white
              font-medium
              transition
              duration-300
              hover:shadow-lg
              hover:scale-[1.02]
              active:scale-[0.98]
            "
            onClick={handleGenerate}
          >
            Generate my Wrapped
          </button>
        </Show>
      </div>
      <hr></hr>
      <HowTo></HowTo>
    </div>
  );
};

export default LandingPage;
