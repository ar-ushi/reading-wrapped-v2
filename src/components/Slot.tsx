import { Component, JSXElement } from "solid-js";

/**
 * React-like frameworks don't offer a way to do declarative slots similar to Vue
 * i.e slots are passed as props typically allowing for very little changes
 * by creating our own slot component and overriding components to use that, we can achieve this
 *
 * taken from - https://raqueeb.com/blog/2023/03/15/3-patterns-to-write-better-and-more-readable-solidjs-components/
 *
 */
interface SlotProps {
  name?: string;
  children: JSXElement;
}
export const Slot: Component<SlotProps> = (props) => {
  return props as unknown as JSXElement;
};
