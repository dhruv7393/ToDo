import axios from "axios";

export const getAllCallLog = (setCall, setError) => {
  axios
    .get(process.env.REACT_APP_BACKEND_URL + "call")
    .then(({ data }) => {
      data.sort((a, b) => (a.done | 0) - (b.done | 0));
      setCall(data);
    })
    .catch((err) => setError(err));
};

export const updateCallLog = (newCallValue, call, setCall, setError) => {
  let completeCallLog = call.map((caller) => {
    if (caller._id === newCallValue._id) return newCallValue;
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
