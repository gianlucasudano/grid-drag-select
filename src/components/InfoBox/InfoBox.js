import PropTypes from "prop-types";
import React from "react";
import Box from "@material-ui/core/Box";
import { StyledInfoBox, StyledLabel } from "./InfoBox.styled";

/**
 * Render a box with info
 *
 * @param {object} props
 * @param {Array} props.infoRows - array of label and messages
 *
 * @returns {React.Component} - <StyledInfoBox>
 */
const InfoBox = ({ infoRows }) => {
  return (
    <StyledInfoBox>
      {infoRows.map(({ label, message }, index) => (
        <Box key={`${label}-${index}`}>
          <StyledLabel>{label}:</StyledLabel>
          {message}
        </Box>
      ))}
    </StyledInfoBox>
  );
};

InfoBox.propTypes = {
  infoRows: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      message: PropTypes.string
    })
  )
};

export default InfoBox;
