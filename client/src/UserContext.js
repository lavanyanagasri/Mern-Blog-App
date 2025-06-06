import { useState } from "react";

const { createContext } = require("react");

export const UserContext=createContext({});

export function UserContextProvider({children}){
  const [userinfo,setuserinfo]=useState({});
  return(
    <UserContext.Provider value={{userinfo,setuserinfo}}>
      {children}
    </UserContext.Provider>
  );
}