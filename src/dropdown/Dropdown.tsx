import { FC } from "react";
import { DropdownInterface } from "./Dropdown.interface";

const Dropdown: FC<DropdownInterface> = (props) => {
  const { id, label, options, onChange, initial } = props;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select value={initial} name="currency-names" id={id} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option  key={option}  value={option}>{option?.toUpperCase()}</option>
        ))}

      </select>
    </div>
  )
}

export default Dropdown;  