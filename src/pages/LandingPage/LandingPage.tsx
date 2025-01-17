import withTranslation from "utils/hocs/withTranslation";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";

interface LandingPageProps {
  t: any;
}

export const LandingPage = ({ t }: LandingPageProps) => {
  return (
    <div>
      <LanguageSelector />
      {t("profile.text")}
    </div>
  );
};

export default withTranslation(LandingPage, "landing");
