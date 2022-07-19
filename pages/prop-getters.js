import { useState } from 'react';
import { Switch } from '../components/switch';

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn?.(...args));

const useToggle = () => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  const getTogglerProps = ({ onClick, ...props } = {}) => {
    console.log({
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    });

    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  };

  return {
    on,
    toggle,
    getTogglerProps,
  };
};

const PropGetters = () => {
  const { on, getTogglerProps } = useToggle();

  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'toggle-button',
          onClick: () => console.log('clicked'),
          id: 'toggle-button',
        })}
      >
        {on ? 'On' : 'Off'}
      </button>
    </div>
  );
};

export default PropGetters;
