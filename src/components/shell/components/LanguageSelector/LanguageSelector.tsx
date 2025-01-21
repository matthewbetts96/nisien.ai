import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useLanguage } from "hooks/useLanguage/useLanguage";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };

  return (
    <Select
      variant="outlined"
      value={language}
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <MenuItem value={"EN"}>English</MenuItem>
      <MenuItem value={"FR"}>French</MenuItem>
    </Select>
  );
};

export default LanguageSelector;
