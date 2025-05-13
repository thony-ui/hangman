import React from "react";

function FlexWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}

export default FlexWrapper;
