import { NuqsAdapter } from "nuqs/adapters/react"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"

import "./index.css"

import { App } from "./app.tsx"

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </StrictMode>
  );
}
