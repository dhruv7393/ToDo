import axios from "axios";

export const getAndAddHeaders = (setHeader, setHeaderAtTop, setError) => {
  axios
    .get(process.env.REACT_APP_BACKEND_URL + "headers")
    .then(({ data }) => {
      let headersPinned = {};
      let headersNotPinned = {};

      data.forEach((currentHeader) => {
        let { pinned } = currentHeader;
        let headerToBeAdded = {};
        headerToBeAdded[currentHeader["_id"]] = currentHeader;
        if (pinned) {
          headersPinned = { ...headersPinned, ...headerToBeAdded };
        } else {
          headersNotPinned = { ...headersNotPinned, ...headerToBeAdded };
        }
      });

      setHeaderAtTop(headersPinned);
      setHeader(headersNotPinned);
    })
    .catch((err) => setError(err));
};

export const addNewHeader = (
  newHeader,
  headers,
  setHeader,
  headersAtTop,
  setHeaderAtTop,
  setError
) => {
  let listOfHeaders = [];
  Object.keys(headers).map((headerId) =>
    listOfHeaders.push(headers[headerId].title)
  );
  Object.keys(headersAtTop).map((headerId) =>
    listOfHeaders.push(headersAtTop[headerId].title)
  );
  if (newHeader.title in listOfHeaders) {
    setError("Header already exists");
  } else {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "headers", newHeader)
      .then((data) => {
        setError("Header added successfully");
        getAndAddHeaders(setHeader, setHeaderAtTop, setError);
      })
      .catch((err) => setError(err));
  }
};
