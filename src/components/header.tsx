import { Link } from "@solidjs/router";
import { CharmSearch } from "solid-iconify/charm";
import { MdiGithub } from "solid-iconify/mdi";
import { createEffect, createSignal } from "solid-js";
import { CarbonMoon, CarbonSun } from "solid-iconify/carbon";
import { Dynamic } from "solid-js/web";
import { TablerHomeHeart } from "solid-iconify/tabler";

export const Header = () => {
  const [dark, setDark] = createSignal(
    document.querySelector("html")?.classList.contains("dark")
  );
  createEffect(() => {
    document.querySelector("html")?.classList.toggle("dark", dark());
  });

  return (
    <div
      flex="row"
      items="center"
      justify="between"
      p="4"
      w="full"
      border-b
      border="gray-5/30"
    >
      <Link href="/">
        <div flex="row" gap="2" items-center>
          <TablerHomeHeart size={24} />
          <h1 text="xl" font="bold">
            Solid iconify
          </h1>
        </div>
      </Link>

      <div flex="row" gap="2">
        <Link href="/collection/all">
          <CharmSearch size={24} />
        </Link>
        <Dynamic
          component={dark() ? CarbonMoon : CarbonSun}
          size={24}
          cursor="pointer"
          onClick={() => setDark(!dark())}
        />
        <a href="https://github.com/Xhofe/solid-iconify">
          <MdiGithub cursor="pointer" size={24} />
        </a>
      </div>
    </div>
  );
};
