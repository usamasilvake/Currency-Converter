import { FC } from "react";
import { DropdownInterface } from "./Dropdown.interface";

const Dropdown: FC<DropdownInterface> = (props) => {
  const { options, onChange, initial } = props;
  return (
    <div>
      <label htmlFor="currency-names"></label>
      <select value={initial} name="currency-names" id="currency-names" onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option  key={option}  value={option}>{option?.toUpperCase()}</option>
        ))}

      </select>
    </div>
  )
}

export default Dropdown;  