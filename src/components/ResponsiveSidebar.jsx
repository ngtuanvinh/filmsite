import { Drawer, Box } from "@mui/material";

import SidebarContent from "./SidebarContent";

const ResponsiveSidebar = ({ mobileOpen, setMobileOpen }) => {
  const handleSidebarToggle = () => {
    setMobileOpen(false);
  };
  return (
    <Box className="sidebar">
      <Drawer
        variant="permanent"
        sx={{ width: "240px", display: { sm: "block", xs: "none" } }}
      >
        <SidebarContent />
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleSidebarToggle}
        anchor="right"
        sx={{ display: { sm: "none", xs: "block" } }}
      >
        <SidebarContent handleSidebarToggle={handleSidebarToggle} />
      </Drawer>
    </Box>
  );
};

export default ResponsiveSidebar;
