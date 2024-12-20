import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdDownloadForOffline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "motion/react";
import { useDocs } from "../contexts/DocsContext";

const Card = ({ data, reference }) => {
  const { updateDoc, deleteDoc } = useDocs();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(data.doc);

  const EditThis = () => {
    setIsEditing(true);
  };
  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };
  const handleBlur = () => {
    setIsEditing(false);
    updateDoc(data.id, { ...data, doc: editedText });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      updateDoc(data.id, { ...data, doc: editedText });
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.5}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className="relative flex-shrink-0 lg:w-56 lg:h-72 w-40 h-60 px-5 py-6 z-[5] text-white rounded-[30px] bg-zinc-900/80 overflow-hidden backdrop-blur-sm"
    >
      <div className="flex justify-between items-center">
        <MdDeleteForever
          className="h-5 w-5 cursor-pointer"
          onClick={() => deleteDoc(data.id)}
        />
        <FaRegEdit onClick={EditThis} className="cursor-pointer" />
      </div>
      {isEditing ? (
        <textarea
          type="text"
          value={editedText}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="mt-2 w-32 lg:w-48 min-h-16 text-sm text-wrap leading-tight font-semibold whitespace-pre-wrap break-words bg-transparent border-b-2 border-white outline-none overflow-y-auto scrollbar-transparent"
          autoFocus
        />
      ) : (
        <p className="mt-2 w-32 max-h-24 lg:w-48 lg:max-h-36 text-sm leading-tight font-semibold break-words overflow-y-auto scrollbar-transparent">
          {editedText}
        </p>
      )}
      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex justify-between items-center py-2 px-5">
          <h4>{data.filesize}</h4>
          <span
            className="text-xl cursor-pointer"
            onClick={() =>
              updateDoc(data.id, {
                ...data,
                close: !data.close,
                tag: {
                  ...data.tag,
                  isOpen: !data.tag.isOpen,
                },
              })
            }
          >
            {data.close ? <IoMdClose /> : <MdDownloadForOffline />}
          </span>
        </div>
        {data.tag && data.tag.isOpen && (
          <div
            className="tag w-full py-4 flex items-center justify-center backdrop-blur-sm cursor-pointer"
            onClick={() =>
              updateDoc(data.id, {
                ...data,
                close: !data.close,
                tag: {
                  ...data.tag,
                  isOpen: !data.tag.isOpen,
                },
              })
            }
            style={{ backgroundColor: `${data.tag.tagColor}` }}
          >
            <h3 className="text-md">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
