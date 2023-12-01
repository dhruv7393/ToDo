import axios from "axios";

export const getAndAddHeaders = (setHeader, setHeaderAtTop, setError) => {
  axios
    .get("https://7pquppixfe.us-east-2.awsapprunner.com/api/headers")
    .then(({ data }) => {
      let headersPinned = {};
      let headersNotPinned = {};

      data.forEach((currentHeader) => {
        let { title, pinned } = currentHeader;
        let headerToBeAdded = {};
        headerToBeAdded[currentHeader["_id"]] = {
          title: title,
          pinned: pinned,
        };
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
  headers.map((headerId) => listOfHeaders.push(headers[headerId].title));
  headersAtTop.map((headerId) =>
    listOfHeaders.push(headersAtTop[headerId].title)
  );
  if (newHeader.title in listOfHeaders) {
    setError("Header already exists");
  } else {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "headers", newHeader)
      .then((data) => {
        console.log("Header added successfully");
        getAndAddHeaders(setHeader, setHeaderAtTop, setError);
      })
      .catch((err) => setError(err));
  }
};
