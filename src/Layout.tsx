import { Outlet } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SkipToContent } from "@/components/SkipToContent";

/**
 * Root layout — every route renders inside this. Providers live here rather
 * than in main.tsx because vite-react-ssg owns router creation.
 */
const Layout = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <SkipToContent />
    <Outlet />
  </ThemeProvider>
);

export default Layout;
