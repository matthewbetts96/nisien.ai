import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";

interface LandingPageProps {
  t: t;
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
