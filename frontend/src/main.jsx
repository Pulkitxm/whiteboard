import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);