import React, { useState } from "react";


export const AppContext = React.createContext();

export const AppProvider = ({children}) => {

  const [ openInstructions, setOpenInstructions ] = useState(false);
  const [ openFinish, setOpenFinish ] = useState(false);
  const [ lose, setLose ] = useState(false);

  return (
    <AppContext.Provider value=
    {{
      openInstructions,
      setOpenInstructions,
      openFinish, 
      setOpenFinish,
      lose,
      setLose
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
