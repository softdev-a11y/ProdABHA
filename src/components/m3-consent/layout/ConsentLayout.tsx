import type { ReactNode } from "react";
import ConsentSidebar from "./ConsentSidebar";

interface ConsentLayoutProps {
  children: ReactNode;
  hideOperatorPanel?: boolean;
}

const ConsentLayout = ({
  children,
  hideOperatorPanel = false,
}: ConsentLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <ConsentSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ConsentLayout;
