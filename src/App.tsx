import "./App.css";
import ContextProvider from "contexts/ContextProvider";
import { Provider } from "react-redux";
import RootRouter from "routes/rootRouter";
import { store } from "store/store";

function App() {
  return (
    <ContextProvider>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </ContextProvider>
  );
}

export default App;
