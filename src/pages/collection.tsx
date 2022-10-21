import { useParams, useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { IconShow } from "../components/icon";
import { searchIcons } from "../store/collections";

const Collections = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const icons = createMemo(() => searchIcons(searchParams.q, params.id));
  const [showNum, setShowNum] = createSignal(200);
  createEffect(() => {
    console.log(params.id);
    setShowNum(200);
  });
  const showIcons = () => icons().slice(0, showNum());
  const loadMore = () => {
    setShowNum(showNum() + 200);
  };
  const loadAll = () => {
    setShowNum(icons().length);
  };
  return (
    <div w-full p-2>
      <div
        non-dragging
        flex-row
        flex-wrap
        select-none
        justify-center
        text-2xl
        text-gray-6
        dark:text-gray
        text-4xl
        gap-2
      >
        <For each={showIcons()}>
          {(icon) => <IconShow dir={params.id} icon={icon} size={34} />}
        </For>
      </div>
      <Show when={showNum() < icons().length}>
        <div mt-2 flex-row justify-center gap-2>
          <button class="btn" bg-indigo onClick={loadMore}>
            Load more
          </button>
          <button class="btn" bg="gray/60" onClick={loadAll}>
            Load all
          </button>
        </div>
      </Show>
      <div m-2 items-center op-50 font-italic>
        {icons().length} icons
      </div>
    </div>
  );
};

export default Collections;
