import { Component, createSignal, onMount, onCleanup, Show } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { Heading } from "../ui";
import { useWrappedSession } from "../../providers/wrappedContext";

const ERA_DURATION = 10_000;

export const Slide4: Component<{ active: boolean }> = (props) => {
  const [phase, setPhase] = createSignal<"era" | "heatmap">("era");
  let timer: number | undefined;
  const { state } = useWrappedSession();
  const { booksPerMonth, mostReadMonth } = state.parsedData.time;
  onMount(() => {
    if (props.active) {
      timer = window.setTimeout(() => setPhase("heatmap"), ERA_DURATION);
    }
  });

  onCleanup(() => timer && clearTimeout(timer));

  return (
    <section class="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Presence>
        <Show when={props.active && phase() === "era"}>
          <Motion.div
            class="text-center z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
          >
              <Heading variant="h4" class="opacity-80">
          Your peak reading era
        </Heading>

        <Heading variant="h1" class="text-6xl md:text-8xl mt-2">
          {mostReadMonth.toUpperCase()}
        </Heading>


            {/* floating stat pills here */}
          </Motion.div>
        </Show>

        <Show when={props.active && phase() === "heatmap"}>
          <Motion.div
            key="heatmap"
            class="w-full max-w-4xl px-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Heading variant="h4" compact>
              Your reading rhythm
            </Heading>

            {/* Heatmap component */}
          </Motion.div>
        </Show>
      </Presence>
    </section>
  );
};
