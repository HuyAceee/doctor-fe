const TOKEN = "token";

export const setStateStorage = (data: any, key: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getStateStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key) || "";
    return data;
  } catch (error) {
    return null;
  }
};

export const deleteStateStorage = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const clearStorage = () => {
  try {
    return localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (state: string) => setStateStorage(state, TOKEN);
export const getToken = () => getStateStorage(TOKEN);
export const deleteToken = () => deleteStateStorage(TOKEN);
