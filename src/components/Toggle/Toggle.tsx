import React, { MouseEventHandler } from "react";
import "./toggle.scss";

type ToggleProps = {
  onChange: MouseEventHandler<HTMLInputElement>;
  value: boolean;
};

const Toggle: React.FC<ToggleProps> = ({ onChange, value }) => {
  return (
    <label className="root" htmlFor="toggler">
      <input
        id="toggler"
        type="checkbox"
        onClick={onChange}
        checked={value}
        readOnly
      />
      <span className="slider" />
      <span className="wave" />
    </label>
  );
};

export default Toggle;
