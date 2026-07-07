  import type { ReactNode } from "react";
  import ConsentSidebar from "./ConsentSidebar";

  interface ConsentLayoutProps {
    children: ReactNode;
  }

  const ConsentLayout = ({ children }: ConsentLayoutProps) => {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <ConsentSidebar />

        <div className="flex-1 min-w-0 flex flex-col">
          <header className="h-16 sm:h-[70px] bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
                Ayushman Bharat Digital Mission
              </h1>

              <p className="text-xs sm:text-sm text-slate-500">
                Consent Management
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                S
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">
                  SYSTEM
                </p>

                <p className="text-xs text-slate-400">
                  Operator
                </p>
              </div>
            </div>

          </header>

        <main
    className=" flex-1 overflow-auto p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 "
  >
    {children}
  </main>
        </div>
      </div>
    );
  };

  export default ConsentLayout;