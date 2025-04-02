import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import SharedBreadcrumbs from "../../shared/components/breadcrumb.component";

const CartLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
      }}
    >
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
    </Box>
  );
};

export default CartLayout;
