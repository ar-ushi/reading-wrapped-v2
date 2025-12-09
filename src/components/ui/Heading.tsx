import type { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
  class?: string;
  compact?: boolean;
  regular?: boolean;
}

const Heading: Component<HeadingProps> = (props) => {
  const {
    variant = "h2",
    children,
    class: className = "",
    compact,
    regular,
    ...rest
  } = props;

  return (
    <Dynamic
      component={variant}
      {...rest}
      class={className}
      classList={{
        compact: compact,
        regular: regular,
      }}
    >
      {children}
    </Dynamic>
  );
};

export default Heading;
