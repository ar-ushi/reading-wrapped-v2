import { Component, createSignal, Show } from "solid-js";
import { Motion } from "solid-motionone";
import { useWrappedSession } from "../../providers/wrappedContext";
import { CountUp } from "../CountUp";
import Stat from "../Stat";
import AnimatedBlobs from "../AnimatedBlobs";
import { Heading } from "../ui";
import BookCover from "../BookCover";

export function getHeading(avgPages: number) {
  if (avgPages < 200) return "You kept things light with shorter reads";
  if (avgPages < 350)
    return "Your page count was very mid but that's not always a bad thing.";
  if (avgPages < 500) return "You weren’t scared of a chunky book";
  return "You and long books became very close friends";
}

export const Slide3: Component = () => {
  const { state } = useWrappedSession();
  const [imgOk, setImgOk] = createSignal(true);

  const averages = state.parsedData.averages;
  const avgPageLength = averages.avg_pages;
  const longestBook = averages?.hero.longestBook?.[0];
  const shortestBook = averages?.hero.shortestBook?.[0];
  console.log(longestBook);
  return (
    <section
      class="
        relative w-full h-screen
        flex flex-col 
        items-center justify-center
        bg-pastelpurple
        text-white overflow-hidden
      "
    >
      <AnimatedBlobs />
      <Heading variant="h4" compact>
        {getHeading(avgPageLength)}
      </Heading>
      <Heading variant="h1" compact>
        You read an average of {avgPageLength} this year!
      </Heading>
      {/* HERO STATS */}
      <div class="mt-8 flex gap-8 z-10">
        {/* LONGEST BOOK */}
        {longestBook && (
          <div class="flex flex-col items-center">
            <Motion.div
              class="rounded-xl overflow-hidden shadow-xl aspect-[2/3] w-36 md:w-44"
              animate={{
                transform: [
                  "translateY(0px)",
                  "translateY(-6px)",
                  "translateY(0px)",
                ],
              }}
              transition={{
                duration: 4,
                easing: "ease-in-out",
                repeat: Infinity,
              }}
            >
              <BookCover
                coverUrl={longestBook.coverUrl}
                title={longestBook.title}
                author={longestBook.author}
              />
            </Motion.div>

            <div class="mt-3 text-center">
              <Heading variant="h6" class="opacity-80">
                Longest book you read
              </Heading>
              <Stat label="Pages">
                <CountUp value={longestBook.pages} />
              </Stat>
            </div>
          </div>
        )}

        {/* SHORTEST BOOK */}
        {shortestBook && (
          <div class="flex flex-col items-center">
            <Motion.div
              class="rounded-xl overflow-hidden shadow-xl aspect-[2/3] w-36 md:w-44"
              animate={{
                transform: [
                  "translateY(0px)",
                  "translateY(-6px)",
                  "translateY(0px)",
                ],
              }}
              transition={{
                duration: 4.3,
                easing: "ease-in-out",
                repeat: Infinity,
              }}
            >
              <BookCover
                coverUrl={shortestBook.coverUrl}
                title={shortestBook.title}
                author={shortestBook.author}
              />
            </Motion.div>

            <div class="mt-3 text-center">
              <Heading variant="h6" class="opacity-80">
                Shortest book you read
              </Heading>
              <Stat label="Pages">
                <CountUp value={shortestBook.pages} />
              </Stat>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
