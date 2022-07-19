import React, { useState, Children, cloneElement } from 'react';
import { Switch } from '../components/switch';

const Toggle = ({ children }) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return Children.map(children, (child) =>
    typeof child.type === 'string' ? child : cloneElement(child, { on, toggle })
  );
};

const ToggleOn = ({ on, children }) => (on ? children : null);

const ToggleOff = ({ on, children }) => (on ? null : children);

const ToggleButton = ({ on, toggle, ...props }) => (
  <Switch on={on} onClick={toggle} {...props} />
);

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
