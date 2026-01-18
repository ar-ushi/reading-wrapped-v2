import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import AnimatedBlobs from "../AnimatedBlobs";
import { Heading, BarChart } from "../ui";
import { useWrappedSession } from "../../providers/wrappedContext";

export const Slide4: Component<{ isActive: boolean }> = (props) => {
  const { state } = useWrappedSession();

  const { booksPerMonth, mostReadMonth } = state.parsedData.time;

  const data = Object.entries(booksPerMonth).map(([month, count]) => ({
    id: month,
    label: month,
    value: count,
    season: getSeason(month),
  }));
  const maxValue = Math.max(...data.map((d) => d.value));

  const peakMonths = data.filter((d) => d.value === maxValue);

  const [mode, setMode] = createSignal<"era" | "grid">("era");

  let timeoutId: number | undefined;

  // createEffect(() => {
  //   if (!props.isActive) return;

  //   // RESET
  //   setMode("era");

  //   timeoutId = window.setTimeout(() => {
  //     setMode("grid");
  //   }, 15000);
  // });

  onCleanup(() => {
    timeoutId && clearTimeout(timeoutId);
  });

  return (
    <section
      class="
        relative w-full h-screen
        flex flex-col items-center justify-center
        bg-gradient-to-b from-indigo-700 via-purple-600 to-pink-400
        text-white overflow-hidden
      "
    >
      <AnimatedBlobs />

      {/* COPY */}
      <div class="z-10 text-center mb-12">
        {mode() === "era" ? (
          <>
            <Heading variant="h1" compact>
              {peakMonths.length === 1
                ? `${peakMonths[0].label} was your era`
                : `${peakMonths.map((m) => m.label).join(" & ")} were your era`}
            </Heading>

            <Heading variant="h6" class="opacity-80 mt-2">
              You read {maxValue} books that month
            </Heading>
          </>
        ) : (
          <>
            <Heading variant="h1" compact>
              You found your reading rhythm
            </Heading>
            <Heading variant="h6" class="opacity-80 mt-2">
              Some months you binged, some you rested
            </Heading>
          </>
        )}
      </div>

      {/* CHART */}
      <div class="z-10 w-4/5 max-w-xl">
        <BarChart data={data} mode={mode()} />
      </div>
    </section>
  );
};

function getSeason(month: String) {
  const seasons = {
    winter: ["december", "january", "february"],
    spring: ["march", "april", "may"],
    summer: ["june", "july", "august"],
    autumn: ["september", "october", "november"],
  };

  for (const [season, months] of Object.entries(seasons)) {
    if (months.includes(month)) {
      return season.charAt(0).toUpperCase() + season.slice(1);
    }
  }
  return null;
}
