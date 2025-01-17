import React from "react";
import withTranslation from "utils/hocs/withTranslation";

export const Test = ({ t }: any) => {
  console.log(t("hello"));
  return <div>hello</div>;
};

export default withTranslation(Test, "home");
