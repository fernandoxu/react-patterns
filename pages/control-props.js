import { useRef, useContext, useState, useReducer } from 'react';
import { Switch } from '../components/switch';

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn?.(...args));

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
};

const toggleReducer = (state, { type, initialState }) => {
  switch (type) {
    case actionTypes.toggle:
      return { on: !state.on };
    case actionTypes.reset:
      return initialState;
    default:
      return state;
  }
};

const useToggle = ({
  initialOn = false,
  reducer = toggleReducer,
  onChange,
  on: controlledOn,
} = {}) => {
  const { current: initialState } = useRef({ on: initialOn });
  const [state, dispatch] = useReducer(reducer, initialState);

  const onIsControlled = controlledOn !== undefined && controlledOn !== null;
  const on = onIsControlled ? controlledOn : state.on;

  const dispatchWithOnChange = (action) => {
    if (!onIsControlled) {
      dispatch(action);
    }

    onChange?.(reducer({ ...state, on }, action), action);
  };

  const toggle = () => dispatchWithOnChange({ type: actionTypes.toggle });
  const reset = () =>
    dispatchWithOnChange({ type: actionTypes.reset, initialState });

  const getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  };

  const getResetterProps = ({ onClick, ...props } = {}) => {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  };

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
};

const Toggle = ({ on: controlledOn, onChange }) => {
  const { on, getTogglerProps } = useToggle({ on: controlledOn, onChange });
  const props = getTogglerProps({ on });
  return <Switch {...props} />;
};

const ControlProps = () => {
  const [bothOn, setBothOn] = React.useState(false);
  const [timesClicked, setTimesClicked] = React.useState(0);

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return;
    }
    setBothOn(state.on);
    setTimesClicked((c) => c + 1);
  }

  function handleResetClick() {
    setBothOn(false);
    setTimesClicked(0);
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid='notice'>
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid='click-count'>Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  );
};

export default ControlProps;

export { Toggle };
