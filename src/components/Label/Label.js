import React from "react";
import Box from "@material-ui/core/Box";
const Label = ({ label, ...rest }) => {
  return <Box {...rest}>{label}</Box>;
};

export default Label;
