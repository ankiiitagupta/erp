import React, { createContext, useContext, useState } from 'react';

// Create Role Context
const RoleContext = createContext();

// Custom Hook for accessing Role Context
export const useRole = () => useContext(RoleContext);

// Provider to manage and provide the roles globally
export const RoleProvider = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState("faculty");

  return (
    <RoleContext.Provider value={[selectedRole, setSelectedRole]}>
      {children}
    </RoleContext.Provider>
  );
};
