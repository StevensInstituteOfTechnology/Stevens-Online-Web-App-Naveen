/**
 * Page Context Provider
 * Provides page information to all child components for automatic tracking
 */

import React, { createContext, useContext } from 'react';

const PageContext = createContext(null);

/**
 * Page Context Provider
 * @param {string} pageType - Page type (home, program, explore, admissions, etc)
 * @param {string} pageName - Page name for identification
 * @param {React.ReactNode} children - Child components
 */
export const PageContextProvider = ({ 
  pageType, 
  pageName,
  children 
}) => {
  const value = {
    pageType,
    pageName
  };
  
  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  );
};

/**
 * Hook to use page context
 */
export const usePageContext = () => {
  return useContext(PageContext);
};

export default PageContext;
