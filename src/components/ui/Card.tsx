import type { Component, JSX } from "solid-js";
import { getSlots } from "../../helpers/getSlots";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

const Card: Component<CardProps> = (props) => {
  const {
    class: className = "",
    children,

    ...rest
  } = props;
  const baseClass = `flex flex-col`;
  const slots = getSlots(children);

  return (
    <div class={`${baseClass} ${className ?? ""}`} {...rest}>
      <div>{slots.heading}</div>
      <div>{slots.content}</div>
    </div>
  );
};

export default Card;
