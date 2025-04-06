import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import SharedBreadcrumbs from "../../shared/components/breadcrumb.component";
import SocialLinks from "../../shared/components/social-links.components";

const CartLayout = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      {/* Top App Bar */}
      <AppBar position="static" sx={{ width: "100%", padding: "10px" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Satya Assignment</Typography>

          <SocialLinks />
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
