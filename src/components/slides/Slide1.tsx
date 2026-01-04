import { Component, For } from "solid-js";
import { Motion } from "solid-motionone";
import { useWrappedSession } from "../../providers/wrappedContext";
import { CountUp } from "../CountUp";
import Stat from "../Stat";
import AnimatedBlobs from "../AnimatedBlobs";
import { Heading } from "../ui";

export const Slide1: Component = () => {
  const { state } = useWrappedSession();
  const totals = state.parsedData?.totals;
  const hero = totals?.hero.top5 ?? [];
  const year = state.year;
  const stats = [
    {
      label: "Books Read",
      value: totals.total_books,
    },
    {
      label: "Pages turned",
      value: totals.total_pages,
    },
    {
      label: "Minutes spent reading",
      value: totals.total_reading_minutes,
    },
  ];
  return (
    <section
      class="
        relative w-full h-screen
        flex flex-col md:flex-row-reverse
        items-center justify-center
        bg-gradient-to-b from-blue-700 via-pink-500 to-pink-200
        text-white overflow-hidden
      "
    >
      <AnimatedBlobs />

      {/* STATS */}
      <Motion.div
        class="md:w-2/5 flex justify-center md:justify-start z-10"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div class="flex flex-col flex-items-center">
          <Heading variant="h1" class="text-primary" compact>
            Your Year At A Glance
          </Heading>

          <Heading variant="h5" class="opacity-90">
            {year}
          </Heading>
          <div class="flex flex-col justify-content-between w-100">
            <For each={stats}>
              {(stat, i) => (
                <Stat label={stat.label}>
                  <CountUp value={stat.value} />
                </Stat>
              )}
            </For>
          </div>
        </div>
      </Motion.div>

      {/* HERO BOOKS */}
      <Motion.div
        class="w-full md:w-3/5 flex justify-center z-10 mt-8 md:mt-0"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          class="
            grid grid-cols-3 gap-3
            md:grid-cols-3 md:grid-rows-2
            max-w-xs md:max-w-lg
          "
        >
          <For each={hero.slice(0, window.innerWidth < 480 ? 4 : 6)}>
            {(book, i) =>
              book.coverUrl && (
                <Motion.div
                  class="
                    rounded-lg md:rounded-xl
                    overflow-hidden shadow-xl
                    aspect-[2/3]
                  "
                  animate={{
                    transform: [
                      "translateY(0px)",
                      "translateY(-6px)",
                      "translateY(0px)",
                    ],
                  }}
                  transition={{
                    duration: 4 + i() * 0.3,
                    easing: "ease-in-out",
                    repeat: Infinity,
                  }}
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    class="w-full h-full object-cover"
                  />
                </Motion.div>
              )
            }
          </For>
        </div>
      </Motion.div>
    </section>
  );
};
