import { createContext, useContext } from "react";

export const DocsContext = createContext({
  docs: [
    {
      id: "1",
      doc: "String",
      filesize: "string",
      close: true,
      tag: { isOpen: false, tagTitle: "Download Now", tagColor: "green" },
    },
  ],
  addDoc: (doc) => {},
  updateDoc: (id, doc) => {},
  deleteDoc: (id) => {},
});

export const useDocs = () => {
  return useContext(DocsContext);
};

export const DocsProvider = DocsContext.Provider;
