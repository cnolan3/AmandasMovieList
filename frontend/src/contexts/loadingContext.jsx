import { createContext, useContext, useReducer, useState } from "react";

import colors from "../sass/colors.module.scss";

const IsLoadingContext = createContext();

function IsLoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [spinnerColor, setSpinnerColor] = useState(colors.colorBackground);

  return (
    <IsLoadingContext.Provider
      value={{
        isLoading,
        spinnerColor,
        setIsLoading,
        setSpinnerColor,
      }}
    >
      {children}
    </IsLoadingContext.Provider>
  );
}

function useIsLoading() {
  const context = useContext(IsLoadingContext);

  if (context === undefined)
    throw new Error("isLoadingContext use outside of isLoadingProvider");

  return context;
}

export { IsLoadingProvider, useIsLoading };

