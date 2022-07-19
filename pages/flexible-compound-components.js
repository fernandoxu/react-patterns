import React, { useState, createContext, useContext } from 'react';
import { Switch } from '../components/switch';

const ToggleContext = createContext();
ToggleContext.displayName = 'ToggleContext';

const Toggle = ({ children }) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

const useToggle = () => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error('useToggle must be used within a Toggle');
  }
  return context;
};

const ToggleOn = ({ children }) => {
  const { on } = useToggle();
  return on ? children : null;
};

const ToggleOff = ({ children }) => {
  const { on } = useToggle();
  return on ? null : children;
};

const ToggleButton = ({ ...props }) => {
  const { on, toggle } = useToggle();

  return <Switch on={on} onClick={toggle} {...props} />;
};
const CompoundComponents = () => {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
        <span>Hello</span>
      </Toggle>
    </div>
  );
};

export default CompoundComponents;
