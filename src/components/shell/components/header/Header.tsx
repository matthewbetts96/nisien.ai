import Typography from "@mui/material/Typography/Typography";
import withTranslation, { t } from "hocs/withTranslation/withTranslation";
import classes from "./Header.module.css";

interface HeaderProps {
  t: t;
}

export const Header = ({ t }: HeaderProps) => {
  return (
    <div className={classes.title}>
      <Typography variant="h2" gutterBottom color="textPrimary">
        {t("title")}
      </Typography>
    </div>
  );
};

export default withTranslation(Header, "shell");
