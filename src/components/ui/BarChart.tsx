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
  const maxValue = Math.max(...props.data.map((d) => d.value));

  const peak = createMemo(() =>
    props.data.reduce((a, b) => (b.value > a.value ? b : a)),
  );

  const grouped = createMemo(() =>
    Object.entries(
      props.data.reduce(
        (acc, d) => {
          acc[d.season] ??= [];
          acc[d.season].push(d);
          return acc;
        },
        {} as Record<string, BarDatum[]>,
      ),
    ),
  );

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
            <For each={props.data}>
              {(item, i) => {
                const heightPct = (item.value / maxValue) * 100;

                return (
                  <Motion.div
                    class="relative bg-white/80 rounded-md w-50"
                    style={{ "transform-origin": "bottom" }}
                    initial={{ height: "0%" }}
                    animate={{
                      height: `${heightPct}%`,
                      width: "24px",
                      scale: item === peak() ? [1, 1.08, 1] : 1,
                      opacity: item === peak() ? 1 : 0.6,
                    }}
                    transition={{
                      height: { duration: 0.6 },
                      scale: {
                        duration: 1.4,
                        repeat: item === peak() ? Infinity : 0,
                        easing: "ease-in-out",
                      },
                      delay: i() * 0.05,
                    }}
                  >
                    {/* Optional label */}
                    <div class="absolute -bottom-6 text-xs opacity-60">
                      {item.label}
                    </div>
                  </Motion.div>
                );
              }}
            </For>
          </Motion.div>
        )}

        {/* ===== GRID MODE ===== */}
        {props.mode === "grid" && (
          <Motion.div
            key="grid"
            class="grid grid-cols-3 gap-6 w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <For each={grouped()}>
              {([season, items], i) => (
                <Motion.div
                  class="rounded-lg bg-white/10 p-3 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i() * 0.1 }}
                >
                  <div class="text-xs uppercase tracking-wide opacity-70">
                    {season}
                  </div>

                  <div class="grid grid-cols-6 gap-1">
                    <For each={items}>
                      {() => (
                        <Motion.div
                          class="w-3 h-3 rounded-sm bg-white/80"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </For>
                  </div>
                </Motion.div>
              )}
            </For>
          </Motion.div>
        )}
      </Presence>
    </div>
  );
};
