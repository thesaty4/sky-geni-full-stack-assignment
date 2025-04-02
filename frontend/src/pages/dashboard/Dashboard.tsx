import { CssBaseline, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./dashboard.style.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // Data for cards
  const cardData = [
    { title: "User Info", path: "customer-type" },
    { title: "Customer Info", path: "user-type" },
    { title: "Orders", path: "orders" },
    { title: "Settings", path: "settings" },
  ];

  return (
    <div className="dashboard-main__wrapper">
      <CssBaseline />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cardData.map(({ title, path }, index) => (
          <Grid
            size={6}
            key={index}
            component="div"
            className="card__wrapper"
            onClick={() => navigate(path)}
          >
            <Typography variant="h6" align="center">
              {title}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} component="div">
        {" "}
        {/* Fix: Added `component="div"` */}
      </Grid>
    </div>
  );
};

export default Dashboard;
