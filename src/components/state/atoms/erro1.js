import { atom, useRecoilState } from "recoil";

export const error1State = atom({
  key: "error1State",
  default: "",
});

export const useError = () => {
  const [error1, setError1] = useRecoilState(error1State);
  return { error1, setError1 };
};
