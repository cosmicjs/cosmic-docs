function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var callout = (({
  children,
  background = 'bg-orange-100 dark:text-gray-800',
  emoji = '💡'
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `${background} flex rounded-lg callout mt-6`
  }, /*#__PURE__*/React.createElement("div", {
    className: "pl-3 pr-2 py-2 select-none text-xl"
  }, emoji), /*#__PURE__*/React.createElement("div", {
    className: "pr-4 py-2"
  }, children));
});

module.exports = callout;
