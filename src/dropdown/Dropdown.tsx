import { FC } from "react";
import { DropdownInterface } from "./Dropdown.interface";

const Dropdown: FC<DropdownInterface> = (props) => {
  const { id, label, options, onChange, initial } = props;
  return (
    <div className="cu-option">
      <label  htmlFor={id}>{label}</label>        
      <select  name="currency-names" value={initial} id={id} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (   
          <option key={option} value={option}>{option?.toUpperCase()}</option> 
        ))};
      </select>
    </div>
  );
};
export default Dropdown;  