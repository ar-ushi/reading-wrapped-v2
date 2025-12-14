import { children, createComputed, JSXElement, on } from "solid-js";
import { createStore } from "solid-js/store";

/**
 *  Extracts named slots for declartive-style slots
 * @param _children - The JSX children passed into a component.
 * @returns An object mapping slot names to their JSX content
 */
export const getSlots = (_children: JSXElement) => {
  const parts = children(() => _children);
  console.log(_children);
  console.log(parts);
  const [slots, setSlots] = createStore<Record<string, JSXElement>>({});
  createComputed(
    on(parts, () => {
      for (const part of parts.toArray() as unknown as SlotProps[]) {
        if (!part.name) {
          setSlots("default", () => part);
          continue;
        }
        setSlots(part.name, () => part.children);
      }
    })
  );
  console.log(slots);
  return slots;
};
