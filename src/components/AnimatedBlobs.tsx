import { Component } from "solid-js";
import { Motion } from "solid-motionone";

const AnimatedBlobs: Component = () => {
  return (
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <Motion.div
        class="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-pink-500/30 blur-3xl"
        animate={{
          transform: [
            "translate(0px, 0px)",
            "translate(40px, 30px)",
            "translate(0px, 0px)",
          ],
        }}
        transition={{
          duration: 14,
          easing: "ease-in-out",
          repeat: Infinity,
        }}
      />

      <Motion.div
        class="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/30 blur-3xl"
        animate={{
          transform: [
            "translate(0px, 0px)",
            "translate(-30px, -40px)",
            "translate(0px, 0px)",
          ],
        }}
        transition={{
          duration: 18,
          easing: "ease-in-out",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default AnimatedBlobs;
