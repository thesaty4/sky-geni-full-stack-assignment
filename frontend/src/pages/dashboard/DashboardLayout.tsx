import { AppBar } from "@mui/material";
import { Outlet } from "react-router-dom";

const CartLayout = () => {
  return (
    <div>
      {/* Top App Bar */}
      <AppBar position="static" sx={{ width: "100%" }} />

      <Outlet />
    </div>
  );
};

export default CartLayout;
