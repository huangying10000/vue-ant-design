/**
 * 随机ID
 * @return string
 */
export const S4 = () => {
  return Math.floor(65_536 * (1 + Math.random()))
    .toString(16)
    .slice(1);
};
