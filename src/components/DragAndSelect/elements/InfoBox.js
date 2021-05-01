import React, { useEffect } from "react";
import { StyledInfoBox, StyledLabel } from "./InfoBox.styled";
import postmanEchoApi from "../../../services/postmanEchoApi";

const InfoBox = ({ itemsState, dispatch }) => {
  const { itemsChangedIndices, itemsChanged, apiResponse = {} } = itemsState;
  const { items, apiStatus, message } = apiResponse;

  useEffect(() => {
    postmanEchoApi({ data: itemsChangedIndices }, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default InfoBox;
