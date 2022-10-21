import { splitProps } from "solid-js";
import "iconify-icon";

export interface IconProps {
  dir: string;
  icon: string;
  size?: string | number;
}
export const Icon = (props: IconProps) => {
  const size = () => {
    if (typeof props.size === "number") {
      return props.size + "px";
    }
    return props.size;
  };
  return (
    // @ts-ignore
    <iconify-icon
      icon={props.dir + ":" + props.icon}
      style={`font-size: ${size()}`}
      // @ts-ignore
    ></iconify-icon>
  );
};

export const IconShow = (props: IconProps) => {
  return (
    <div
      border-1
      border-transparent
      rounded-md
      p-1
      hover="border-indigo c-indigo"
    >
      <Icon {...props} />
    </div>
  );
};
