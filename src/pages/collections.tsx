import { Link, Outlet, useParams, useSearchParams } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { collections, setSearchMode } from "../store/collections";

const Collections = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = createSignal("");
  return (
    <div flex-row w-full h-full>
      <div py-4 w-54 h-full border="r gray/30">
        <div px-2>
          <input
            placeholder="Search collections"
            outline-none
            c-indigo-5
            px-4
            py-2
            rounded-md
            w-full
            bg="gray/15"
            onInput={(e) => setSearch(e.currentTarget.value)}
            value={search()}
          />
        </div>
        <div mt-2 px-2 flex-1 gap-1 class="overflow-overlay">
          <For
            each={[
              {
                name: "All",
                dir: "all",
                total: collections
                  .map((c) => c.total)
                  .reduce((pre, cur) => pre! + cur!, 0),
              },
              ...collections,
            ].filter((c) =>
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
                      ? "bg-indigo-5 c-white"
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
        <div flex-row gap-2>
          <select
            bg="gray/15"
            rounded-md
            outline-none
            p-1
            cursor-pointer
            onChange={(e) => {
              setSearchMode(e.currentTarget.value);
            }}
          >
            <option value="precise">Precise search</option>
            <option value="fuzzy">Fuzzy search</option>
          </select>
          <input
            placeholder="Search icons"
            outline-none
            c-indigo
            px-4
            py-2
            rounded-md
            flex-1
            bg="gray/15"
            onInput={(e) => setSearchParams({ q: e.currentTarget.value })}
            value={searchParams.q ?? ""}
          />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Collections;
