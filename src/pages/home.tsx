import { createSignal, For } from "solid-js";
import { Collection } from "../components/collection";
import { searchCollections } from "../store/collections";
import { CollectionType } from "../types";

const Collections = () => {
  const [keyword, setKeyword] = createSignal("");
  return (
    <div p="4" gap="2" items-center w-full>
      <div flex="row" w-full justify-center>
        <input
          placeholder="Search collections"
          border="2 indigo/30"
          outline-none
          focus="border-indigo border-2"
          px-4
          py-2
          rounded-md
          w="50%"
          onInput={(e) => setKeyword(e.currentTarget.value)}
          value={keyword()}
        />
      </div>
      <For each={searchCollections(keyword())}>
        {([category, collections]) => (
          <div w-full>
            <h2 text-xl c-gray-5 p="2">
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
