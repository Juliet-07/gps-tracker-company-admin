import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Wind,
  Home,
  Map,
  Users,
  Car,
  BarChart3,
  MapPin,
  Settings,
  ChevronDown,
  User,
  Shield,
  LogOut,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo_White from "../assets/logo.svg";

const navItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/home",
  },
  {
    icon: Map,
    label: "Map",
    href: "/map",
  },
  {
    icon: Users,
    label: "Users",
    href: "/users",
  },
  {
    icon: Car,
    label: "Devices",
    href: "/devices",
  },
  {
    icon: BarChart3,
    label: "Reports",
    href: "/reports",
  },
  // {
  //   icon: MapPin,
  //   label: "Geofences",
  //   href: "/geofences",
  // },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

const AppSidebar = () => {
  const { state, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed" && !isMobile;

  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/login");
  };

  const handleMobileNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      className="bg-primary text-white border-r-0 [&[data-mobile=true]]:bg-white [&[data-mobile=true]]:text-gray-800"
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col p-0 bg-primary [&[data-mobile=true]]:bg-white">
        <SidebarHeader className="p-4 border-b border-white/20 bg-primary [&[data-mobile=true]]:bg-white [&[data-mobile=true]]:border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={handleMobileNavClick}
            >
              <Wind className="h-7 w-7 text-white [&[data-mobile=true]]:text-white" />
              {(!isCollapsed || isMobile) && (
                <img src={Logo_White} className="w-[100px]" />
              )}
            </Link>
            {isMobile && (
              <button
                onClick={handleMobileNavClick}
                className="p-2 rounded-md hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </SidebarHeader>
        <nav className="flex-grow mt-4 px-2 bg-primary [&[data-mobile=true]]:bg-white">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="justify-start text-base hover:bg-white/20 data-[active=true]:bg-white/20 data-[active=true]:hover:bg-white/30 text-white [&[data-mobile=true]]:text-gray-800 [&[data-mobile=true]]:hover:bg-gray-100 [&[data-mobile=true]]:data-[active=true]:bg-gray-100 py-3 px-4"
                    tooltip={
                      isCollapsed && !isMobile
                        ? {
                            children: item.label,
                            side: "right",
                            align: "center",
                          }
                        : undefined
                    }
                  >
                    <Link
                      to={item.href}
                      className="flex items-center space-x-3 py-[22px]"
                      onClick={handleMobileNavClick}
                    >
                      <item.icon className="h-5 w-5" />
                      {(!isCollapsed || isMobile) && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </nav>
        {/* <SidebarFooter className="mt-auto p-2 border-t border-white/20 bg-primary [&[data-mobile=true]]:bg-white [&[data-mobile=true]]:border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className={`flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-white/10 [&[data-mobile=true]]:hover:bg-gray-100 ${
                  isCollapsed && !isMobile ? "justify-center" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full border-2 border-white/50 [&[data-mobile=true]]:border-gray-200 flex-shrink-0">
                  <img
                    src="https://i.pravatar.cc/40?u=admin"
                    alt="Admin"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {(!isCollapsed || isMobile) && (
                  <>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-sm text-white [&[data-mobile=true]]:text-gray-800">
                        ADMIN
                      </span>
                      <span className="text-xs text-white/70 [&[data-mobile=true]]:text-gray-500 truncate">
                        admin@ekaze.com
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              className="w-72 p-0 rounded-lg mb-4 mx-4 bg-white border shadow-lg z-50"
            >
              <div className="p-4 flex items-center gap-4 border-b">
                <img
                  src="https://i.pravatar.cc/40?u=admin"
                  alt="Admin"
                  className="w-14 h-14 rounded-full border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">ADMIN</h3>
                  <p className="text-[#52897d] font-medium">Administrator</p>
                  <p className="text-sm text-gray-500">admin@ekaze.com</p>
                </div>
              </div>

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/profile">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        Profile Settings
                      </div>
                      <div className="text-xs text-gray-500">
                        Manage your account
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="px-4 py-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3 text-base">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Security</div>
                    <div className="text-xs text-gray-500">
                      Password & authentication
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="px-4 py-3 cursor-pointer text-red-500 hover:!text-red-500 hover:!bg-red-50"
                onClick={handleSignOut}
              >
                <div className="flex items-center gap-3 text-base w-full">
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter> */}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
