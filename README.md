# react-component-spy

## Why Spy on React Component Props?

React Testing Library is a great supplement to Jest when testing React components. The philosophy is
heavy on integration testing, and shallow mounting is frowned upon, considered a slippery slope
towards testing implementation details.

However, unit testing components by testing the React props can have benefits:

1. It can actually help avoid testing implementation details.
2. Testing components as units helps focus on the boundaries between two components, which
   encourages clean architecture. Integration tests don't necessarily encourage good architecture by
   default.

Sometimes, it's useful to check React props instead of HTML attributes. Sometimes the props you're
looking for don't get passed down to the HTML attribute, or sometimes you're using a 3rd party
component library and don't want to tie your tests to implementation details of the library.
Instead, you might want to test that you're correctly passing props to the components, i.e. test
that you're correctly interacting with the library's API. Indeed, your tests will break if you
switch to a different component library, but this is desirable, since it will tell you that the
behavior is broken.

This tiny library will allow you to spy on React component props, giving you a more unit-test driven
approach on top of the testing library of your choice.

TODO:

- [ ] Basic usage
- [ ] Publish to NPM
- [ ] Coverage, badges
