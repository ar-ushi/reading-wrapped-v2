import { Component, JSXElement } from "solid-js";
import { Motion } from "solid-motionone";

const Stat: Component<{ label: string; children: JSXElement }> = (props) => (
  <Motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    class="flex justify-between items-center w-full"
  >
    <span>{props.label}</span>
    <span class="font-semibold">{props.children}</span>
  </Motion.div>
);

export default Stat;
