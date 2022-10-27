import { createSignal, For } from "solid-js";
import { Collection } from "../components/collection";
import { Install } from "../components/install";
import { searchCollections } from "../store/collections";

const Collections = () => {
  const [keyword, setKeyword] = createSignal("");
  return (
    <div p="4" gap="2" items-center w-full>
      <div mb-2 flex="row" w-full justify-center>
        <input
          placeholder="Search collections"
          outline-none
          c-indigo-5
          px-4
          py-2
          rounded-md
          w-full
          md="w-50%"
          bg="gray/15"
          onInput={(e) => setKeyword(e.currentTarget.value)}
          value={keyword()}
        />
      </div>
      <Install />
      <For each={searchCollections(keyword())}>
        {([category, collections]) => (
          <div w-full>
            <h2 text-xl c-indigo-5 p="2">
              {category}
            </h2>
            <div
              grid
              gap="2"
              style={{
                "grid-template-columns":
                  "repeat(auto-fill, minmax(240px, 1fr))",
              }}
            >
              <For each={collections}>
                {(collection) => <Collection {...collection} />}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
export default Collections;
