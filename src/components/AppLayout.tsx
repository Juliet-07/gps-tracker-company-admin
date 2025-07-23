
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { SidebarProvider } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-grow bg-gray-50">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
