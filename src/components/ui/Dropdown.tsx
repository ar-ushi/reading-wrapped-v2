import type { Component, JSX } from "solid-js";
import { getSlots } from "../../helpers/getSlots";
interface DropdownProps extends JSX.HTMLAttributes<HTMLSelectElement> {
  class?: string;
  value?: string | Number;
  range?: { from: number; to: number };
  descending?: boolean;
}

const Dropdown: Component<DropdownProps> = (props) => {
  const {
    class: className = "",
    children,
    range,
    descending = true,
    ...rest
  } = props;
  const slots = getSlots(children);
  const rangeOptions = () => {
    if (!range) return [];

    const { from, to } = range;
    const list = Array.from({ length: Math.abs(to - from) + 1 }, (_, i) =>
      descending ? to - i : from + i,
    );

    return list;
  };

  return (
    <label class={className}>
      {slots.label}

      <select
        class={`
          appearance-none
        px-4 py-2
        rounded-xl
        border border-gray-300
        bg-white
        text-gray-800
        text-sm
        shadow-sm
        focus:outline-none
        transition
        cursor-pointer
  `}
        {...rest}
      >
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
