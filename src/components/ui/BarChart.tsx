import { Component, For, createMemo } from "solid-js";
import { Motion, Presence } from "solid-motionone";

export type BarDatum = {
  id: string;
  label: string; // month
  value: number; // books/pages
  season: "Winter" | "Spring" | "Summer" | "Autumn";
};

type Props = {
  data: BarDatum[];
  mode: "era";
  maxHeight?: number;
};

export const BarChart: Component<Props> = (props) => {
  const maxValue: number = Math.max(...props.data.map((d) => d.value));

  const MONTH_LABELS: Record<string, string> = {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec",
  };
  /**
   * look into moving this logic out and make a true reusable component
   */
  const taggedData = props.data.map(({ label, value }) => ({
    label: MONTH_LABELS[label.toLowerCase()] ?? label.slice(0, 3),
    value: value,
  }));

  return (
    <div class="w-full">
      <Presence exitBeforeEnter>
        {props.mode === "era" && (
          <Motion.div
            key="era"
            class="flex items-end gap-3 h-64 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div class="flex justify-between w-full">
              <For each={taggedData}>
                {(item, i) => (
                  <div class="flex flex-col items-center w-10">
                    <div class="relative h-64 flex items-end">
                      <Motion.div
                        class="bg-white/80 rounded-md w-6"
                        style={{ "transform-origin": "bottom" }}
                        initial={{ height: "0%" }}
                        animate={{
                          height: `${(item.value / maxValue) * 100}%`,
                          scale: item.value === maxValue ? [1, 1.1, 1] : 1,
                          opacity: item.value === maxValue ? 1 : 0.6,
                        }}
                        transition={{
                          height: { duration: 0.6 },
                          scale: {
                            duration: 1.4,
                            repeat: item.value === maxValue ? Infinity : 0,
                            easing: "ease-in-out",
                          },
                          delay: i() * 0.05,
                        }}
                      />
                    </div>

                    <div class="mt-2 text-xs opacity-70">{item.label}</div>
                  </div>
                )}
              </For>
            </div>
          </Motion.div>
        )}
      </Presence>
    </div>
  );
};
