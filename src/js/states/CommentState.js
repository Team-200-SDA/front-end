const { atom } = require('recoil');

export const commentState = atom({
  key: 'commentState',
  default: []
});
