import React, { useRef } from "react";
import Card from "./Card";

const Forground = () => {
  const ref = useRef(null);

  const data = [
    {
      desc: "This is the first card that is created before any other card.",
      filesize: "0.8 mb",
      close: true,
      tag: { isOpen: false, tagTitle: "Download Now", tagColor: "green" },
    },
    {
      desc: "This is the second card that is created before any other card.",
      filesize: "0.8 mb",
      close: false,
      tag: { isOpen: true, tagTitle: "Download Now", tagColor: "indianred" },
    },
    {
      desc: "This is the third card that is created before any other card.",
      filesize: "0.8 mb",
      close: true,
      tag: { isOpen: true, tagTitle: "Upload", tagColor: "purple" },
    },
  ];

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-full flex gap-10 flex-wrap p-5"
    >
      {data.map((item, index) => (
        <Card key={index} data={item} reference={ref} />
      ))}
    </div>
  );
};

export default Forground;
