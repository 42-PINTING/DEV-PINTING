import { atom } from 'recoil';

// 도구 선택 상태 Atom
export const toolState = atom({
  key: 'toolState',
  default: 'pen',
});
