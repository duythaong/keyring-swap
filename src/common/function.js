export const saveDataLocal = (key, data) => {
  // eslint-disable-next-line no-undef
  localStorage.setItem(key, JSON.stringify(data))
}
