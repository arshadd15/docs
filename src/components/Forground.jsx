import React, { useRef } from "react";
import Card from "./Card";
import { useDocs } from "../contexts/DocsContext";

const Forground = () => {
  const ref = useRef(null);
  const { docs } = useDocs();

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-full flex gap-10 flex-wrap p-5"
    >
      {docs.map((item, index) => (
        <Card key={index} data={item} reference={ref} />
      ))}
    </div>
  );
};

export default Forground;
