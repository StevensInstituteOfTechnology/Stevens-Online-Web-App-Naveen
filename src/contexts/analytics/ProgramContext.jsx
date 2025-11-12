/**
 * Program Context Provider
 * Provides program information to all child components for automatic tracking
 */

import React, { createContext, useContext } from 'react';

const ProgramContext = createContext(null);

/**
 * Program Context Provider
 * @param {string} programCode - Program code (mscs, mba, mem, etc)
 * @param {string} programName - Full program name
 * @param {string} programType - Program type (degree, certificate)
 * @param {React.ReactNode} children - Child components
 */
export const ProgramContextProvider = ({ 
  programCode, 
  programName, 
  programType,
  children 
}) => {
  const value = {
    programCode,
    programName,
    programType
  };
  
  return (
    <ProgramContext.Provider value={value}>
      {children}
    </ProgramContext.Provider>
  );
};

/**
 * Hook to use program context
 */
export const useProgramContext = () => {
  return useContext(ProgramContext);
};

export default ProgramContext;

