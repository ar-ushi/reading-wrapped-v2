import { Component, For } from "solid-js";
import { Motion } from "solid-motionone";
import { useWrappedSession } from "../../providers/wrappedContext";

export const Slide1: Component = () => {
  const { state } = useWrappedSession();
  const totals = state.parsedData?.totals;
  const hero = totals.hero.top5;

  return (
    <section
      class="
    w-full h-screen
    flex flex-col  md:flex-row-reverse
    items-center justify-center
    px-4 md:px-16
    bg-gradient-to-br from-neutral-900 to-neutral-800
    text-white
  "
    >
      {" "}
      <Motion.div
        class="w-full md:w-2/5 text-center md:text-left"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 class="text-3xl md:text-5xl font-bold leading-tight">
          Your Reading Wrapped
        </h1>

        <p class="text-base md:text-lg opacity-70 mt-1">2024</p>

        <div class="mt-6 md:mt-8 space-y-3 md:space-y-4 text-sm md:text-lg">
          <Stat label="Books read" value={totals?.total_books} />
          <Stat label="Pages turned" value={totals?.total_pages} />
          <Stat
            label="Hours spent reading"
            value={`~${totals?.total_reading_hours}`}
          />
        </div>
      </Motion.div>
      <Motion.div
        class="w-full md:w-3/5 flex justify-center"
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
          <For each={hero.slice(0, window.innerWidth < 400 ? 4 : 7)}>
            {(book, i) => (
              <Motion.div
                class="
                  rounded-lg md:rounded-xl
                  overflow-hidden
                  shadow-xl
                  bg-neutral-700
                  aspect-[2/3]
                "
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i() * 0.1 }}
              >
                {book.coverUrl != undefined && (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    class="w-full h-full object-cover"
                  />
                )}
              </Motion.div>
            )}
          </For>
        </div>
      </Motion.div>
    </section>
  );
};

const Stat: Component<{ label: string; value: string | number }> = (props) => (
  <Motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    class="
      flex justify-between
      max-w-xs md:max-w-sm
      mx-auto md:mx-0
    "
  >
    <span class="opacity-70">{props.label}</span>
    <span class="font-semibold">{props.value}</span>
  </Motion.div>
);
