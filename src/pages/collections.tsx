import { Link, Outlet, useParams, useSearchParams } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { collections } from "../store/collections";

const Collections = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = createSignal("");
  return (
    <div flex-row w-full h-full>
      <div py-4 px-2 w-54 h-full border="r gray/30">
        <input
          placeholder="Search icons"
          border="2 indigo/30"
          outline-none
          focus="border-indigo border-2"
          px-4
          py-2
          rounded-md
          w-full
          onInput={(e) => setSearch(e.currentTarget.value)}
          value={search()}
        />
        <div mt-2 flex-1 gap-1 class="overflow-overlay">
          <For
            each={collections.filter((c) =>
              c.name.toLowerCase().includes(search().toLowerCase())
            )}
          >
            {(collection) => (
              <Link
                href={`/collection/${collection.dir}?q=${searchParams.q ?? ""}`}
              >
                <div
                  p="2"
                  rounded-md
                  cursor-pointer
                  class={
                    params.id === collection.dir
                      ? "bg-indigo c-white"
                      : "hover-bg-gray/15"
                  }
                >
                  <h2 op-90>{collection.name}</h2>
                  <p text-sm op-50>
                    {collection.total} icons
                  </p>
                </div>
              </Link>
            )}
          </For>
        </div>
      </div>
      <div p-4 flex-1>
        <input
          placeholder="Search icons"
          border="2 indigo/30"
          outline-none
          focus="border-indigo border-2"
          px-4
          py-2
          rounded-md
          w-full
          onInput={(e) => setSearchParams({ q: e.currentTarget.value })}
          value={searchParams.q ?? ""}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Collections;
