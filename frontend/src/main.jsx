import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import {persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import  store  from "./redux/Store.js";

import { Toaster } from "sonner";
import { SocketProvider } from "./Context/SocketContext.jsx";

const persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>

        <App />
        </SocketProvider>
      </PersistGate>
    </Provider>

    <Toaster position="bottom-right" richColors />
  </StrictMode>
);