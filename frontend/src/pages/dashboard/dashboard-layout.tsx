import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import SharedBreadcrumbs from "../../shared/components/breadcrumb.component";

const CartLayout = () => {
  return (
    <div>
      {/* Top App Bar */}
      <AppBar position="static" sx={{ width: "100%", padding: "10px" }}>
        <Toolbar>
          <Typography variant="h6">Satya Assignment</Typography>
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      <SharedBreadcrumbs />

      {/* Render Nested Routes */}
      <Outlet />
    </div>
  );
};

export default CartLayout;
