import { setStateTroughApi } from "../components/DragAndSelect/reducer/dragAndSelectActions";

async function postmanEchoApi({ data }, dispatch) {
  if (!data) {
    return;
  }

  const postData = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  };

  try {
    let response = await fetch(
      "https://w1mbh.sse.codesandbox.io/api/echo",
      postData
    );
    let result = await response;
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const { status } = result;

    if (status === 405) {
      dispatch(
        setStateTroughApi({
          items: [],
          apiStatus: status,
          message:
            "The container has been hibernated because of inactivity, you can start it by refreshing this page: https://codesandbox.io/s/setup-basic-nodejs-server-forked-w1mbh"
        })
      );
    }
    if (status === 200) {
      dispatch(
        setStateTroughApi({
          items: data,
          apiStatus: status,
          message: ""
        })
      );
    }
  } catch (err) {
    dispatch(
      setStateTroughApi({
        items: [],
        apiStatus: err,
        message: "somenthing whent wrong!"
      })
    );
  }
}
export default postmanEchoApi;
