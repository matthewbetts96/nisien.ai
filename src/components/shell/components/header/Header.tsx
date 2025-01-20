import Typography from "@mui/material/Typography/Typography";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";

interface HeaderProps {
  t: t;
}

export const Header = ({ t }: HeaderProps) => {
  return (
    <div>
      <div>
        <Typography variant="h2" gutterBottom>
          {t("title")}
        </Typography>
      </div>
    </div>
  );
};

export default withTranslation(Header, "shell");
