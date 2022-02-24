export const saveDataLocal = (key: any, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}
