import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { CollectionType } from "../types";
import data from "../web.json";

export const collections = data as CollectionType[];
// const [collections, setCollections] = createStore<CollectionType[]>(
//   data as CollectionType[]
// );

export const searchCollections = (search: string = "") => {
  const filtered = collections.filter((collection) =>
    collection.name.toLowerCase().includes(search.toLowerCase())
  );
  const map = new Map<string, CollectionType[]>();
  filtered.forEach((collection) => {
    const category = collection.category ?? "Other";
    if (!map.has(category)) {
      map.set(category, []);
    }
    map.get(category)!.push(collection);
  });
  return Array.from(map.entries());
};

const [searchMode, setSearchMode] = createSignal("precise");

export { setSearchMode };

export const match = (text: string, search: string) => {
  if (searchMode() === "fuzzy") {
    if (!search) return true;
    let index = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i].toLowerCase() === search[index].toLowerCase()) {
        index++;
        if (index === search.length) return true;
      }
    }
    return false;
  } else if (searchMode() === "precise") {
    return text.toLowerCase().includes(search.toLowerCase());
  }
};

export const searchIcons = (search: string = "", collectionDir = "") => {
  let icons: {
    name: string;
    dir: string;
  }[] = [];
  if (collectionDir === "all") {
    icons = collections.flatMap((collection) =>
      collection.icons.map((icon) => ({
        name: icon,
        dir: collection.dir,
      }))
    );
  } else {
    icons = collections
      .find((collection) => collection.dir === collectionDir)
      ?.icons.map((icon) => ({ name: icon, dir: collectionDir }))!;
  }

  return icons.filter((icon) => match(icon.name, search));
};
