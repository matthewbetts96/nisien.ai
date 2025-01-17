import { Select } from "antd";
import { useLanguage } from "utils/hooks/useLanguage";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select
      value={language}
      style={{ width: 120 }}
      onChange={(i) => setLanguage(i)}
      options={[
        { value: "EN", label: "English" },
        { value: "FR", label: "French" },
      ]}
    />
  );
};

export default LanguageSelector;
