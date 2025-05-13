import React from "react";

function Box({
  letter,
  actualLetter,
}: {
  letter: string;
  actualLetter: string;
}) {
  let bg = "";
  if (letter === "!") {
    bg = "bg-red-500";
  }
  return (
    <div
      className={`flex flex-col items-center justify-center w-10 h-10 border-black border-b-2 ${bg}`}
    >
      <p className={`font-bold text-2xl ${bg ? "text-white" : "text-black"}`}>
        {bg !== "" ? actualLetter : letter}
      </p>
    </div>
  );
}

export default Box;
