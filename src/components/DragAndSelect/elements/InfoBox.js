import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { StyledInfoBox, StyledLabel } from "./InfoBox.styled";
import postmanEchoApi from "../../../services/postmanEchoApi";

/**
 * Render a box with items and api status
 *
 * @param {object} props
 * @param {array} props.itemsState - items state
 * @param {dispatch} props.dispatch - dispatch from reducer
 *
 * @returns {React.Component}
 */
const InfoBox = ({ itemsState, dispatch }) => {
  const { itemsChangedIndices, itemsChanged, apiResponse = {} } = itemsState;
  const { items, apiStatus, message } = apiResponse;

  useEffect(() => {
    postmanEchoApi({ data: itemsChangedIndices }, dispatch);
  }, [dispatch, itemsChangedIndices]);

  return (
    <StyledInfoBox>
      <div>
        <StyledLabel>Cells with changes:</StyledLabel>
        {itemsChanged}
      </div>
      <div>
        <StyledLabel>Api status: </StyledLabel>
        {apiStatus}
      </div>
      <div>
        <StyledLabel>Info: </StyledLabel>
        {items ? `Cells updates are ${items}` : message}
      </div>
    </StyledInfoBox>
  );
};

InfoBox.propTypes = {
  dispatch: PropTypes.func,
  itemsState: PropTypes.shape({
    apiResponse: PropTypes.shape({
      apiStatus: PropTypes.number,
      items: PropTypes.string,
      message: PropTypes.string
    }),
    itemsChanged: PropTypes.string,
    itemsChangedIndices: PropTypes.array
  })
};

export default InfoBox;
