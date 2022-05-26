import "./App.css";
import { ListView } from "./views/ListView";
import { Container } from "@material-ui/core";
function App() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { sm: "column" },
        minWidth: "500px",
      }}
    >
      <ListView />
    </Container>
  );
}

export default App;
