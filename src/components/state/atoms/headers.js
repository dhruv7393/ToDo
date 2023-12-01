import { atom, useRecoilState } from "recoil";

const initialState = {};

export const headerState = atom({
  key: "header",
  default: initialState,
});

export const headerAtTopState = atom({
  key: "headerAtTop",
  default: initialState,
});

export const useHeaderState = () => {
  const [header, setHeader] = useRecoilState(headerState);
  const [headerAtTop, setHeaderAtTop] = useRecoilState(headerAtTopState);
  return { header, setHeader, headerAtTop, setHeaderAtTop };
};
