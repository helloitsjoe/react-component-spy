import React from 'react';

export function getProps(ComponentSpy, indexOrPropToFind = 0) {
  if (typeof ComponentSpy.mock === 'undefined') {
    throw new Error('Mock not found - Did you mock the component?');
  }
  if (typeof indexOrPropToFind === 'number') {
    const [props] = ComponentSpy.mock.calls[indexOrPropToFind];
    return props;
  }

  // Finds a specific function call (i.e. a specific instance of a component)
  // by finding a prop with a string selector like '[data-testid="first-button"]'
  // or an object like { 'data-testid': 'first-button' }
  const matchingCall = ComponentSpy.mock.calls.find(call => {
    const [key, value] =
      typeof indexOrPropToFind === 'string'
        ? indexOrPropToFind.replace(/[[\]"']/g, '').split('=')
        : Object.entries(indexOrPropToFind)[0];
    return call[0][key] === value;
  });

  if (!matchingCall) {
    throw new Error(`Component not found for prop matching: ${JSON.stringify(indexOrPropToFind)}`);
  }

  const [props] = matchingCall;
  return props;
}

export function moduleSpy(path) {
  const module = jest.requireActual(path);

  // Create a new exports object (including default) that spies on all exports
  return Object.entries(module).reduce(
    (spies, [realName, RealComponent]) => {
      // Create a spy for each export, transfering static properties
      const SpyWithStatics = Object.entries(RealComponent).reduce(
        (Spy, [staticKey, staticValue]) => {
          Spy[staticKey] = staticValue;
          return Spy;
        },
        // TODO: This works to spy on class components, but feels janky. Is there a better way?
        isClass(RealComponent) ? jest.fn(() => new RealComponent()) : jest.fn(RealComponent)
      );

      if (isClass(RealComponent)) {
        SpyWithStatics.prototype = React.Component.prototype;
      }

      spies[realName] = SpyWithStatics;
      return spies;
    },
    { __esModule: true }
  );
}

function isClass(Component) {
  return !!new Component({}).isReactComponent;
}
