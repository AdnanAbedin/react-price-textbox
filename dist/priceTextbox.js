"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PriceTextbox;
var _react = require("react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function isNumeric(num) {
  return !isNaN(num) && isFinite(num);
}
function PriceTextbox(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    placeholder = _ref.placeholder,
    className = _ref.className,
    allowNegative = _ref.allowNegative,
    defaultValue = _ref.defaultValue,
    id = _ref.id,
    maxLimit = _ref.maxLimit;
  var _useState = (0, _react.useState)("0"),
    _useState2 = _slicedToArray(_useState, 2),
    stateValue = _useState2[0],
    setStateValue = _useState2[1];
  var _useState3 = (0, _react.useState)("0"),
    _useState4 = _slicedToArray(_useState3, 2),
    defaultStateValue = _useState4[0],
    setDefaultStateValue = _useState4[1];
  (0, _react.useEffect)(function () {
    if (defaultValue) {
      setDefaultStateValue(defaultValue.toString());
    }
  }, [defaultValue]);
  (0, _react.useEffect)(function () {
    if (!isNumeric(value)) {
      setStateValue("0");
    } else {
      setStateValue(value.toString());
    }
  }, [value]);
  var doPriceChange = function doPriceChange(newValue) {
    if (!isNumeric(newValue)) {
      setStateValue("0");
      onChange(0, id);
      return;
    }
    if (!allowNegative && parseFloat(newValue) < 0) {
      setStateValue("0");
      onChange(0, id);
      return;
    }
    if (maxLimit && parseFloat(newValue) > maxLimit) {
      setStateValue(maxLimit.toString());
      onChange(maxLimit, id);
      return;
    }
    setStateValue(newValue);
    onChange(parseFloat(newValue), id);
  };
  var handlePriceChange = function handlePriceChange(e) {
    var newValue = e.target.value || "0";
    doPriceChange(newValue);
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      doPriceChange((defaultStateValue === null || defaultStateValue === void 0 ? void 0 : defaultStateValue.toString()) || "0");
    }
    if (e.key === "ArrowUp") {
      var newValue = (parseFloat(stateValue) + 1).toString();
      doPriceChange(newValue);
    }
    if (e.key === "ArrowDown") {
      var _newValue = (parseFloat(stateValue) - 1).toString();
      doPriceChange(_newValue);
    }
  };
  var handleOnFocus = function handleOnFocus(e) {
    e.currentTarget.select();
  };
  return /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: className || "",
    placeholder: placeholder || "",
    value: stateValue,
    onChange: handlePriceChange,
    onKeyDown: handleKeyDown,
    onFocus: handleOnFocus
  });
}