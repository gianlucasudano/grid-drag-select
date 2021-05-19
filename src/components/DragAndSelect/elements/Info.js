import PropTypes from "prop-types";
import React, { useEffect } from "react";
import InfoBox from "../../InfoBox/InfoBox";
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
const Info = ({ itemsState, dispatch }) => {
  const { itemsChangedIndices, itemsChanged, apiResponse = {} } = itemsState;
  const { items, apiStatus, message } = apiResponse;

  const infoRows = [
    {
      label: "Cells with changes",
      message: itemsChanged
    },
    {
      label: "Api status",
      message: apiStatus
    },
    {
      label: "Info",
      message: items ? `Cells updates are ${items}` : message
    }
  ];
  useEffect(() => {
    postmanEchoApi({ data: itemsChangedIndices }, dispatch);
  }, [dispatch, itemsChangedIndices]);

  return <InfoBox infoRows={infoRows} />;
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

export default Info;
