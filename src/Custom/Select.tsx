import { ISelectProps } from "../dataDefinition/definition";
import "./select.scss"
export const Select: React.FC<ISelectProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <select value={value} onChange={onChange} className="language-select">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
