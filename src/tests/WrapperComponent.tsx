import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../App";
import { DataProvider } from "../services/DataService";

const WrapperComponent = ({ children }: any) => (
  <DataProvider>
    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>
  </DataProvider>
);

export default WrapperComponent;
