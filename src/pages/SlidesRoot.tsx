import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { Motion } from "solid-motionone";
import { Slide1, Slide2, Slide3, Slide4 } from "../components/slides";

const AUTO_ADVANCE_MS = 30_000;

const SlidesRoot: Component<{}> = () => {
  const [index, setIndex] = createSignal(0);
  let timer: number | undefined;

  const slides = [Slide1, Slide2, Slide3, Slide4];
  const Slide = slides[index()];

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
    setIndex((i) => (i + 1) % slides.length);
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
        {slides.map((SlideComp) => (
          <div class="h-screen w-full">
            <SlideComp />
          </div>
        ))}
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
        <button
          onClick={next}
          class="
            text-white text-2xl
            opacity-30 hover:opacity-70
            transition
          "
          aria-label="Previous slide"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default SlidesRoot;
