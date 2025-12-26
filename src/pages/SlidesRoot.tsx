import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { Motion } from "solid-motionone";
import { Slide1 } from "../components/slides/Slide1";

const AUTO_ADVANCE_MS = 30_000;

const SlidesRoot: Component<{}> = () => {
  const [index, setIndex] = createSignal(0);
  let timer: number | undefined;

  const slides = [<Slide1></Slide1>];

  function next() {
    setIndex((i) => Math.min(i + 1, slides.length - 1));
    resetTimer();
  }

  function prev() {
    setIndex((i) => Math.max(i - 1, 0));
    resetTimer();
  }
  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = window.setInterval(autoAdvance, AUTO_ADVANCE_MS);
  }

  function autoAdvance() {
    setIndex((i) => {
      if (i >= slides.length - 1) return i;
      return i + 1;
    });
  }
  onMount(() => {
    timer = window.setInterval(autoAdvance, AUTO_ADVANCE_MS);
  });

  onCleanup(() => {
    if (timer) clearInterval(timer);
  });

  return (
    <div class="w-full h-screen overflow-hidden relative">
      <Motion.div
        class="absolute inset-0"
        animate={{ transform: `translateY(-${index() * 100}vh)` }}
        transition={{ duration: 0.6, easing: "ease-in-out" }}
      >
        <div class="h-screen w-full">{slides[index()]}</div>
      </Motion.div>

      <div class="hidden md:flex absolute inset-y-0 left-6 items-center">
        <button
          onClick={prev}
          class="
            text-white text-2xl
            opacity-30 hover:opacity-70
            transition
          "
          aria-label="Previous slide"
        >
          ←
        </button>
      </div>
    </div>
  );
};

export default SlidesRoot;
