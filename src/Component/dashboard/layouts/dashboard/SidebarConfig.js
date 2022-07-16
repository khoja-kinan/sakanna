// component
import Iconify from "../../components/Iconify";
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "communities",
    path: "/dashboard/comunities",
    icon: getIcon("eva:shopping-bag-fill"),
  },
];

export default sidebarConfig;
