import React, { useRef } from "react";
import Card from "./Card";
import { useDocs } from "../contexts/DocsContext";

const Forground = () => {
  const ref = useRef(null);
  const { docs } = useDocs();

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-full flex flex-wrap p-3 lg:p-5 gap-6 overflow-y-auto overflow-x-hiddenscrollbar-thin scrollbar-thumb scrollbar-thumb-transparent"
    >
      {docs.map((item, index) => (
        <Card key={index} data={item} reference={ref} />
      ))}
    </div>
  );
};

export default Forground;
