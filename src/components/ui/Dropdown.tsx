import type { Component, JSX } from "solid-js";
interface DropdownProps extends JSX.HTMLAttributes<HTMLSelectElement> {
  label?: JSX.Element; // slot for custom label content
  class?: string;
  range?: { from: number; to: number };
  descending?: boolean;
}

const Dropdown: Component<DropdownProps> = (props) => {
  const {
    label,
    class: className = "",
    children,
    range,
    descending = true,
    ...rest
  } = props;

  const rangeOptions = () => {
    if (!range) return [];

    const { from, to } = range;
    const list = Array.from({ length: Math.abs(to - from) + 1 }, (_, i) =>
      descending ? to - i : from + i
    );

    return list;
  };

  return (
    <label class="flex flex-col gap-1 text-primary">
      {label && <span>{label}</span>}

      <select class={className} {...rest}>
        {range
          ? rangeOptions().map((value) => (
              <option value={value}>{value}</option>
            ))
          : children}
      </select>
    </label>
  );
};

export default Dropdown;
