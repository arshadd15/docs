import React, { useContext, useEffect, useRef, useState } from "react";
import Background from "./components/Background";
import Forground from "./components/Forground";
import { CgAdd } from "react-icons/cg";
import { DocsProvider, useDocs } from "./contexts/DocsContext";

const App = () => {
  const [docs, setDocs] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newDoc, setNewDoc] = useState("");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDoc.trim()) {
      addDoc({
        doc: newDoc,
        filesize: (Math.random() * 1).toFixed(2) + "MB",
      });
      setNewDoc("");
      setIsFormVisible(false);
    }
  };

  const addDoc = (doc) => {
    const colors = ["green", "blue", "orange", "pink", "purple"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setDocs((prev) => [
      ...prev,
      {
        id: Date.now(),
        doc: doc.doc,
        filesize: doc.filesize || "N/A",
        close: false,
        tag: doc.tag || {
          isOpen: true,
          tagTitle: "Download Now",
          tagColor: randomColor,
        },
      },
    ]);
  };

  const updateDoc = (id, doc) => {
    setDocs((prev) =>
      prev.map((prevDoc) => (prevDoc.id === id ? doc : prevDoc))
    );
  };

  const deleteDoc = (id) => {
    setDocs((prev) => prev.filter((prevDoc) => prevDoc.id !== id));
  };

  useEffect(() => {
    const doc = JSON.parse(localStorage.getItem("docs"));

    if (doc && doc.length > 0) {
      setDocs(doc);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("docs", JSON.stringify(docs));
  }, [docs]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DocsProvider value={{ docs, addDoc, updateDoc, deleteDoc, useDocs }}>
      <div className="relative w-full min-h-screen bg-teal-200/30 font-semibold text-gray-700">
        <CgAdd
          className="h-20 w-20 absolute right-5 top-5 bg-slate-950/80 text-gray-100 rounded-full cursor-pointer z-10"
          onClick={() => setIsFormVisible(true)}
        />
        {isFormVisible && (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="absolute top-20 right-5 flex bg-white p-4 rounded-lg shadow-lg z-20"
          >
            <input
              type="text"
              placeholder="Write Doc..."
              className="w-full border text-black border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={newDoc}
              onChange={(e) => setNewDoc(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-r-lg px-3 py-1 bg-orange-700 text-white shrink-0"
            >
              Add
            </button>
          </form>
        )}
        <Background />
        <Forground />
      </div>
    </DocsProvider>
  );
};

export default App;
