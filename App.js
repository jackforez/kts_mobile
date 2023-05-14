import { persistor, store } from "./src/redux/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MyApp } from "./src/screens";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyApp />
      </PersistGate>
    </Provider>
  );
}
