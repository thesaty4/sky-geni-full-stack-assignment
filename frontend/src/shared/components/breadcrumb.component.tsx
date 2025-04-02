import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const SharedBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // Extract path segments

  return (
    <div style={{ padding: "16px" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/" underline="hover">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          return index === pathnames.length - 1 ? (
            <Typography key={index} color="text.primary">
              {value}
            </Typography>
          ) : (
            <Link
              key={index}
              component={RouterLink}
              to={routeTo}
              underline="hover"
            >
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default SharedBreadcrumbs;
