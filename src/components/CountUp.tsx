import { Component, createEffect, createSignal } from "solid-js";

export const CountUp: Component<{
  value: number;
  duration?: number;
}> = (props) => {
  const [display, setDisplay] = createSignal(0);

  createEffect(() => {
    const start = performance.now();
    const duration = props.duration ?? 2000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * props.value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });

  return <span>{display()}</span>;
};
