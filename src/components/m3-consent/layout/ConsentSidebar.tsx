  import { useState } from "react";
  import {
    FileText,
    Table2,
    Menu,
    X,
  } from "lucide-react";
  import { NavLink } from "react-router-dom";

  const menus = [
    {
      title: "Request Consent",
      path: "/m3/request-consent",
      icon: FileText,
    },
    {
      title: "Consent Request List",
      path: "/m3/request-list",
      icon: Table2,
    },
  ];

  const ConsentSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <span className="font-semibold text-slate-800">
            ABDM M3
          </span>

          <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
            S
          </div>
        </div>

        {/* Overlay */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={` fixed top-0 left-0 z-50 h-screen  w-[250px] bg-[#0F172A] text-white flex flex-col overflow-hidden transition-transform duration-300

            ${
              open
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }

            lg:sticky
            lg:top-0
            lg:translate-x-0
            lg:shrink-0
          `}
        >
          {/* Logo */}
          <div className="px-6 py-8 border-b border-slate-700 flex justify-between items-start">

            <div>
              <h1 className="text-2xl font-bold">
                ABDM M3
              </h1>

              <p className="text-sm text-slate-400 mt-2">
                Health Information Exchange
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden"
            >
              <X size={22} />
            </button>

          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">

            <p className="text-xs uppercase text-slate-500 mb-3">
              Consent
            </p>

            <div className="space-y-2">

              {menus.map((menu) => {
                const Icon = menu.icon;

                return (
                  <NavLink
                    key={menu.title}
                    to={menu.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                        isActive
                          ? "bg-teal-600 text-white"
                          : "text-slate-300 hover:bg-slate-800"
                      }`
                    }
                  >
                    <Icon size={18} />

                    <span className="text-sm font-medium">
                      {menu.title}
                    </span>

                  </NavLink>
                );
              })}

            </div>

          </nav>

        </aside>
      </>
    );
  };

  export default ConsentSidebar;