import { createContext, useContext, useReducer, useState } from "react";

import LoadingOverlay from "../components/UI/LoadingOverlay/LoadingOverlay";
import colors from "../sass/colors.module.scss";

const loadingOverlayContext = createContext();

function LoadingOverlayProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [spinnerColor, setSpinnerColor] = useState(colors.colorBackground);

  function setIsLoading(isLoading, spinnerColor = colors.colorBackground) {
    setSpinnerColor(spinnerColor);
    setLoading(isLoading);
  }

  return (
    <loadingOverlayContext.Provider
      value={{
        isLoading: loading,
        spinnerColor,
        setIsLoading,
      }}
    >
      <LoadingOverlay />
      {children}
    </loadingOverlayContext.Provider>
  );
}

function useLoadingOverlay() {
  const context = useContext(loadingOverlayContext);

  if (context === undefined)
    throw new Error("isLoadingContext use outside of isLoadingProvider");

  return context;
}

export { LoadingOverlayProvider, useLoadingOverlay };
