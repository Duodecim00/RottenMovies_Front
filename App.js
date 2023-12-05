import React from "react";

//React navigation Stack
import RootStack from "./src/navigators/RootStack";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    // <AuthProvider></AuthProvider>
   <RootStack/>
  );
}