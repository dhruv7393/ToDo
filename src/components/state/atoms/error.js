import { atom, useRecoilState } from "recoil";

export const errorState = atom({
  key: "errorState",
  default: "",
});

export const useError = () => {
  const [error, setError] = useRecoilState(errorState);
  return { error, setError };
};
