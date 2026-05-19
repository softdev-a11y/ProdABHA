  import {
    Users,
    Link2,
    History,
    X,
    PanelLeftClose,
    PanelLeftOpen,
  } from "lucide-react";

  import { NavLink } from "react-router-dom";

  interface Props {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;

    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }

  const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    collapsed,
    setCollapsed,
  }: Props) => {
    return (
      <>
        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            ${
              collapsed
                ? "w-[80px]"
                : "w-[220px]"
            }
          min-h-screen
            bg-[#006d6d]
            text-white
            flex flex-col
            transition-all duration-300
            overflow-y-auto

          fixed lg:relative
          top-[60px] lg:top-0
           left-0
          z-50 lg:z-40
          shrink-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >

          {/* HEADER */}
          <div className="px-4 py-5 border-b border-[#0f8b8b] flex items-center justify-between">

            {/* TITLE */}
            {!collapsed && (
              <h1 className="text-2xl font-bold">
                CareLink
              </h1>
            )}

            {/* DESKTOP COLLAPSE BUTTON */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`
                hidden lg:flex
                items-center justify-center

                ${collapsed ? "mx-auto" : "ml-auto"}
              `}
            >
              {collapsed ? (
                <PanelLeftOpen size={20} />
              ) : (
                <PanelLeftClose size={20} />
              )}
            </button>

            {/* MOBILE CLOSE */}
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={22} />
            </button>

          </div>

          {/* MENU */}
          <div className="flex-1 px-3 py-6 space-y-2">

            {[
              {
                icon: Users,
                label: "Patients",
                path: "/linkedpatients",
              },
              {
                icon: Link2,
                label: "Link Records",
                path: "/patientrecords",
              },
              {
                icon: History,
                label: "Linked History",
                path: "/linkedhistory",
              },
            ].map((item, index) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    flex items-center
                    ${
                      collapsed
                        ? "justify-center"
                        : "gap-3"
                    }

                    w-full px-4 py-3 rounded-xl transition-all duration-300

                    ${
                      isActive
                        ? "bg-[#0f8b8b]"
                        : "hover:bg-[#0f8b8b]"
                    }
                    `
                  }
                >

                  <Icon size={20} />

                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}

                </NavLink>
              );
            })}

          </div>

        </aside>
      </>
    );
  };

  export default Sidebar;