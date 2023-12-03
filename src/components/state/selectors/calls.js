import axios from "axios";

export const getAllCallLog = (setCall, setError) => {
  axios
    .get(process.env.REACT_APP_BACKEND_URL + "call")
    .then(({ data }) => {
      setCall(data);
    })
    .catch((err) => setError(err));
};

export const updateCallLog = (newCallValue, call, setCall, setError) => {
  console.log(call);
  let completeCallLog = call.map((caller) => {
    if (caller._id == newCallValue._id) return newCallValue;
    return caller;
  });
  axios
    .patch(
      process.env.REACT_APP_BACKEND_URL + "call/" + newCallValue._id,
      newCallValue
    )
    .then((data) => setCall([...completeCallLog]))
    .catch((err) => setError(err));
};
