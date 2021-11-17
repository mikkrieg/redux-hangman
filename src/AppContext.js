import React, { useState } from "react";


export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

  const [open, setOpen] = useState(false);

  return (
    <AppContext.Provider value=
    {{
      open,
      setOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
