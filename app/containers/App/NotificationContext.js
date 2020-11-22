import React from 'react';

const notificationInitial = {
  type: '',
  text: '',
};

const GlobalStateContext = React.createContext(notificationInitial);
const DispatchStateContext = React.createContext(undefined);

/**
 * Global State provider & hooks
 */
export const NotificationProvider = ( {children} ) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    notificationInitial,
  );
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useNotificationState = () => [
  React.useContext(GlobalStateContext),
  React.useContext(DispatchStateContext),
];
