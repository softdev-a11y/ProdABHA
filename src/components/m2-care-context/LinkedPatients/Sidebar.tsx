  import {
    ArrowLeft,
    Users,
    History,
    X,
    Link,
    PanelLeftClose,
    PanelLeftOpen,
     FileText,
     QrCode,
  } from "lucide-react";

  import { NavLink } from "react-router-dom";

  interface Props {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;

    collapsed: boolean;
    setCollapsed: (value: boolean) => void;

    onNavigate?: (path: string) => void;
  }

  const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    collapsed,
    setCollapsed,
    onNavigate,
  }: Props) => {
    return (
      <>
        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            ${collapsed ? "w-[80px]" : "w-[250px]"}
            fixed top-0 left-0 z-50 h-screen
            bg-[#0F172A]
            text-white
            flex flex-col
            overflow-hidden
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:sticky
            lg:top-0
            lg:translate-x-0
            lg:shrink-0
          `}
        >

          {/* HEADER */}
          <div className="px-6 py-8 border-b border-slate-700 flex justify-between items-start">

            {/* TITLE */}
            {!collapsed && (
              <div>
                <h1 className="text-2xl font-bold">
                  CareLink
                </h1>

                <p className="text-sm text-slate-400 mt-2">
                  Health Information Exchange
                </p>
              </div>
            )}

            {/* DESKTOP COLLAPSE BUTTON */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`
                hidden lg:flex
                items-center justify-center
                p-2 rounded hover:bg-slate-800 transition

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

          {/* BACK TO MODULE */}
          <div className="px-4 pt-4">
            <NavLink
              to="/module"
              onClick={(event) => {
                setSidebarOpen(false);

                if (onNavigate) {
                  event.preventDefault();
                  onNavigate("/module");
                }
              }}
              className={`
                flex items-center
                ${collapsed ? "justify-center" : "gap-2"}
                w-full rounded-lg border border-slate-700 px-3 py-2 text-slate-200 transition hover:bg-slate-800
              `}
            >
              <ArrowLeft size={16} />

              {!collapsed && (
                <span className="text-sm font-medium">
                  Module
                </span>
              )}
            </NavLink>
          </div>

          {/* MENU */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">

            {!collapsed && (
              <p className="text-xs uppercase text-slate-500 mb-3">
                Care
              </p>
            )}

            <div className="space-y-2">

            {[
              {
                icon: Users,
                label: "Patients",
                path: "/linkedpatients",
              },
        
              {
                icon: History,
                label: "Linked History",
                path: "/linkedhistory",
              },

              {
                icon: Link,
                label: "Deep Link Notification",
                path: "/deeplinknotification",
              },
              {
                icon: FileText,
                label: "User Initiated Transactions",
                path: "/internal/user-initiated-transactions",
              },

              {
                icon: QrCode,
                label: "ABDM Counter",
                path: "/internal/abdm-counter",
              },
            ].map((item, index) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={(event) => {
                    setSidebarOpen(false);

                    if (onNavigate) {
                      event.preventDefault();
                      onNavigate(item.path);
                    }
                  }}
                  className={({ isActive }) =>
                    `
                    flex items-center
                    ${collapsed ? "justify-center" : "gap-3"}

                    w-full rounded-lg px-4 py-3 transition

                    ${
                      isActive
                        ? "bg-teal-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }
                    `
                  }
                >

                  <Icon size={18} />

                  {!collapsed && (
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  )}

                </NavLink>
              );
            })}

            </div>

          </nav>

        </aside>
      </>
    );
  };

  export default Sidebar;