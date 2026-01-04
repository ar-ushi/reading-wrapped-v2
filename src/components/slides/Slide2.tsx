import {
  Component,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { Motion } from "solid-motionone";
import { useWrappedSession } from "../../providers/wrappedContext";

import AnimatedBlobs from "../AnimatedBlobs";
import { Heading } from "../ui";

export function pagesToObjects(totalPages: number) {
  if (totalPages > 50000)
    return "You read enough pages to wrap around a football field";

  if (totalPages > 10000)
    return "You read enough pages to build a small bookshelf";

  return "You read enough pages to fill a backpack";
}

export function minutesToDays(totalMinutes: number) {
  const days = Math.round(totalMinutes / 1440);
  if (days > 1) return `That's close to ${days} days spent reading`;

  return `You spent an entire ${days} only reading`;
}
export const Slide2: Component = () => {
  const { state } = useWrappedSession();
  const totals = state.parsedData.totals;
  const totalBooks = state.parsedData.totals.total_books;
  const messages = [
    {
      title: `That's ${totals.total_pages} pages of reading`,
      subtitle: pagesToObjects(totals.total_pages),
    },
    {
      title: `That is equivalent to ${totals.total_reading_minutes} minutes`,
      subtitle: minutesToDays(totals.total_reading_minutes),
    },
  ];

  const [index, setIndex] = createSignal(0);
  const [visible, setVisible] = createSignal(false);

  onMount(() => {
    setVisible(true);

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setVisible(true);
      }, 600);
    }, 8000);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <section
      class="
        relative w-full h-screen
        flex flex-col md:flex-row-reverse
        items-center justify-center
        bg-gradient-to-b from-tertiary to-secondary
        text-white overflow-hidden
      "
    >
      <AnimatedBlobs />

      <div class="flex flex-col flex-items-center">
        <Heading variant="h1" class="text-primary" compact>
          You read {totalBooks} books!
        </Heading>
        <Show when={messages[index()]} keyed>
          {(msg) => (
            <>
              <Motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={
                  visible()
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.6, opacity: 0 }
                }
                transition={{ duration: 0.5, easing: "ease-in-out" }}
              >
                <Heading variant="h1" compact>
                  {msg.title}
                </Heading>
              </Motion.div>

              <Motion.div
                class="mt-4"
                initial={{ opacity: 0, y: 16 }}
                animate={
                  visible() ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                transition={{ duration: 0.5, easing: "ease-in-out" }}
              >
                <Heading variant="h6" class="opacity-80">
                  {msg.subtitle}
                </Heading>
              </Motion.div>
            </>
          )}
        </Show>
      </div>
    </section>
  );
};
