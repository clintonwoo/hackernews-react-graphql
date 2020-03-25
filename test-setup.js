const { configure, shallow, render, mount } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
