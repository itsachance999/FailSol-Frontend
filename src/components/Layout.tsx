import { Container } from "@mui/material";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";

type Props = {
  //   children: React.ReactNode;
};

const Layout = ({}: Props) => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" sx={{ my: 32 }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
