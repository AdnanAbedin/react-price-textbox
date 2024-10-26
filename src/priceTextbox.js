import { useState, useEffect } from "react";

function isNumeric(num) {
  return !isNaN(num) && isFinite(num);
}

export default function PriceTextbox({
  value,
  onChange,
  placeholder,
  className,
  allowNegative,
  defaultValue,
  id,
  maxLimit
}) {
  const [stateValue, setStateValue] = useState("0");
  const [defaultStateValue, setDefaultStateValue] = useState("0");

  useEffect(() => {
    if (defaultValue) {
      setDefaultStateValue(defaultValue.toString());
    }
  }, [defaultValue]);

  useEffect(() => {
    if (!isNumeric(value)) {
      setStateValue("0");
    } else {
      setStateValue(value.toString());
    }
  }, [value]);

  const doPriceChange = (newValue) => {
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

  const handlePriceChange = (e) => {
    const newValue = e.target.value || "0";
    doPriceChange(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }

    if (e.key === "Escape") {
      doPriceChange(defaultStateValue?.toString() || "0");
    }

    if (e.key === "ArrowUp") {
      const newValue = (parseFloat(stateValue) + 1).toString();
      doPriceChange(newValue);
    }

    if (e.key === "ArrowDown") {
      const newValue = (parseFloat(stateValue) - 1).toString();
      doPriceChange(newValue);
    }
  };

  const handleOnFocus = (e) => {
    e.currentTarget.select();
  };

  return (
    <input
      type="text"
      className={className || ""}
      placeholder={placeholder || ""}
      value={stateValue}
      onChange={handlePriceChange}
      onKeyDown={handleKeyDown}
      onFocus={handleOnFocus}
    />
  );
}
