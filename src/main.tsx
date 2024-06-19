import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "./styles/main.css";

const theme = createTheme({
  fontFamily: "Space Mono, monospace",
  headings: {
    fontFamily: "Space Mono, monospace",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    <App />
  </MantineProvider>
);
