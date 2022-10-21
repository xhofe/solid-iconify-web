import { Copy } from "./copy";

export const Install = () => {
  return (
    <div w-full gap-4>
      <Copy content="pnpm install solid-iconify">
        <div block>
          <span c-indigo break-all>
            pnpm install
          </span>
          <span ml-1 break-all>
            solid-iconify
          </span>
        </div>
      </Copy>
    </div>
  );
};
