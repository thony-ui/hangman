import React from "react";

function Letter({
  letter,
  handleClick,
  disabled,
}: {
  letter: string;
  handleClick: (letter: string) => void;
  disabled: boolean;
}) {
  return (
    <div
      className={`w-[30px] h-[30px] bg-gray-500 flex items-center justify-center flex-col ${
        disabled ? "cursor-auto" : "cursor-pointer"
      } ${disabled ? "opacity-50" : ""}`}
      onClick={() => {
        if (!disabled) handleClick(letter);
      }}
    >
      <p className="text-white">{letter}</p>
    </div>
  );
}

export default Letter;
