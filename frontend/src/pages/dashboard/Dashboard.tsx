import { CssBaseline } from "@mui/material";
import MultiCardGrid, {
  CardListType,
} from "../../shared/components/multi-card.component";
import { MODULE_NAMES } from "../../shared/constant/common.const";
import "./dashboard.style.css";

const cardData: CardListType[] = [
  {
    title: "Customer Type",
    description:
      "Get a detailed classification of customers based on segments, preferences, and engagement levels.",
    image: "/images/tech-chart.jpg",
    routeTo: `${MODULE_NAMES.CUSTOMER}`,
  },
  {
    title: "ACV Range",
    description:
      "Analyze the Annual Contract Value (ACV) distribution across various accounts using graphical data.",
    image: "/images/green-chart.jpg",
    routeTo: `${MODULE_NAMES.ACV}`,
  },

  {
    title: "Team",
    description:
      "Manage and oversee team structures, roles, and performance through insightful data visualizations.",
    image: "/images/light-graph.webp",
    routeTo: `${MODULE_NAMES.TEAM}`,
  },
  {
    title: "Account Industry",
    description:
      "View graphs and table data related to different account industries, providing valuable insights, Click to see account related info.",
    image: "/images/chart.webp",
    routeTo: `${MODULE_NAMES.ACCOUNT}`,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-main__wrapper">
      <CssBaseline />
      <MultiCardGrid cardList={cardData} />
    </div>
  );
};

export default Dashboard;
