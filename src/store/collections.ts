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

export const searchIcons = (search: string = "", collectionDir = "") => {
  const collection = collections.find(
    (collection) => collection.dir === collectionDir
  );
  return collection!.icons.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );
};
