import { atom, useRecoilState } from "recoil";

export const callState = atom({
  key: "callState",
  default: {},
});

export const useCall = () => {
  const [call, setCall] = useRecoilState(callState);
  return { call, setCall };
};
