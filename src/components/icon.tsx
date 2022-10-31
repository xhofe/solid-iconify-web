import { Accessor, createSignal, onCleanup, Show, splitProps } from "solid-js";
import "iconify-icon";
import { Portal } from "solid-js/web";
import { Copy } from "./copy";
import { getIconName } from "../utils";
import { MdiClose } from "solid-iconify/mdi";

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

export default function clickOutside(
  el: HTMLElement,
  accessor: Accessor<() => void>
) {
  const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

export const IconShow = (props: IconProps) => {
  const [show, setShow] = createSignal(false);
  const name = getIconName(props.dir, props.icon);
  return (
    <>
      <div
        border-1
        border-transparent
        rounded-md
        p-1
        hover="border-indigo c-indigo-5"
        cursor-pointer
        onClick={() => setShow(!show())}
      >
        <Icon {...props} />
      </div>
      <Show when={show()}>
        <Portal>
          <div
            w-screen
            h-screen
            pos-fixed
            top-0
            left-0
            backdrop-blur-sm
            justify-center
            items-center
          >
            <div
              w="90%"
              lg="w-244"
              sm="flex-row"
              bg-white
              dark="bg-dark"
              // @ts-ignore
              use:clickOutside={() => setShow(false)}
              p-8
              gap-4
              rounded-xl
              border="2 gray/20"
              items-center
              relative
            >
              <div
                absolute
                right-2
                top-2
                cursor-pointer
                onClick={[setShow, false]}
              >
                <MdiClose size={30} />
              </div>
              <div
                rounded-xl
                border="1 gray/40"
                p-2
                hover="c-indigo border-indigo"
              >
                <div max-w-sm p-1 class="overflow-overlay">
                  <Icon {...props} size={200} />
                </div>
              </div>
              <div gap-3 flex-1>
                <h3 text-xl>Import icon from library</h3>
                <Copy
                  content={`import { ${name} } from 'solid-iconify/${props.dir}'`}
                >
                  <div block>
                    <span c-indigo-5 break-all>
                      import
                    </span>
                    <span break-all c-orange>
                      {" { "}
                    </span>
                    <span break-all>{name}</span>
                    <span break-all c-orange>
                      {" } "}
                    </span>
                    <span c-indigo-5 break-all>
                      from 'solid-iconify/{props.dir}'
                    </span>
                  </div>
                </Copy>
                <h3 text-xl>Render the icon</h3>
                <Copy content={`<${name} />`}>
                  <div block>
                    <span c-indigo-5 break-all>
                      &lt;
                    </span>
                    <span break-all>{name}</span>
                    <span c-indigo-5 break-all>
                      {" "}
                      /&gt;
                    </span>
                  </div>
                </Copy>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </>
  );
};
