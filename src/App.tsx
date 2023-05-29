import ContextProvider from "contexts/ContextProvider";
import { useEffect } from "react";
import { Provider } from "react-redux";
import RootRouter from "routes/rootRouter";
import { store } from "store/store";
import { version as newVersion } from "utils/version";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);

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
        <PersistGate loading={null} persistor={persistor}>
          <RootRouter />
        </PersistGate>
      </Provider>
    </ContextProvider>
  );
}

export default App;
