import "./App.css";
import ContextProvider from "contexts/ContextProvider";
import { Provider } from "react-redux";
import RootRouter from "routes/rootRouter";
import { store } from "store/store";
import { useEffect } from "react";
import { version as newVersion } from "utils/version";

function App() {
  const version = localStorage.getItem("version") || "";
  const handleSetVersion = () => {
    localStorage.setItem("version", version);
  };
  const handleClearCache = async () => {
    if ("caches" in window) {
      const keyStorages = await caches.keys();
      await Promise.all(keyStorages.map((name) => caches.delete(name)));
      window.location.reload();
    }
    localStorage.clear();
    handleSetVersion();
    return;
  };
  useEffect(() => {
    if (!version) {
      handleSetVersion();
      return;
    }
    if (version !== newVersion) {
      handleClearCache();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ContextProvider>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </ContextProvider>
  );
}

export default App;
