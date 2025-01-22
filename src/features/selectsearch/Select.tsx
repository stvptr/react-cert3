export const Select = <T extends { [key in K]: string }, K extends keyof T>({
  labelKey,
  options,
  valueChange,
}: {
  valueChange: (newValue: T) => void;
  options: T[];
  labelKey: K;
}) => {
  return (
    <select
      onChange={(e) => {
        const selectedOption = options.find(
          (option) => option[labelKey] === e.target.value,
        );
        if (selectedOption) {
          valueChange(selectedOption);
        }
      }}
    >
      {options.map((option) => (
        <option key={option[labelKey]}>{option[labelKey]}</option>
      ))}
    </select>
  );
};
