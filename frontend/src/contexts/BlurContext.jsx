import { createContext, useContext, useReducer, useState } from "react";

import BlurOverlay from "../components/UI/BlurOverlay/BlurOverlay";

const blurContext = createContext();

function BlurProvider({ children }) {
  const [blur, setBlur] = useState(false);

  return (
    <blurContext.Provider
      value={{
        blur,
        setBlur,
      }}
    >
      {children}
    </blurContext.Provider>
  );
}

function useBlur() {
  const context = useContext(blurContext);

  if (context === undefined)
    throw new Error("blurContext use outside of blurProvider");

  return context;
}

export { BlurProvider, useBlur };

