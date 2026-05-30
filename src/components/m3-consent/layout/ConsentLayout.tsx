import { useState } from "react";

import {
  Menu,
  X,
} from "lucide-react";

import type { ReactNode } from "react";

import ConsentSidebar from "./ConsentSidebar";

interface Props {
  children: ReactNode;
  currentStep: number;
}

const ConsentLayout = ({
  children,
  currentStep,
}: Props) => {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <ConsentSidebar
          currentStep={currentStep}
        />
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="
              fixed
              inset-0
              bg-black/40
              z-40
              lg:hidden
            "
            onClick={() =>
              setOpen(false)
            }
          />

          {/* Sidebar */}
          <div
            className="
              fixed
              left-0
              top-0
              z-50
              lg:hidden
              h-screen
            "
          >
            <ConsentSidebar
              currentStep={currentStep}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {/* Mobile Header */}
        <div
          className="
            lg:hidden
            sticky
            top-0
            z-30
            bg-white
            border-b
            border-[#e5e7eb]
            px-4
            py-3
            flex
            items-center
            justify-between
          "
        >
          {/* Hamburger */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
              w-10
              h-10
              rounded-xl
              bg-white
              border
              border-[#e5e7eb]
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            {open ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

          {/* Title */}
          <h2
            className="
              text-[15px]
              font-semibold
              text-[#111827]
            "
          >
            ABDM M3
          </h2>

          {/* Empty Space */}
          <div className="w-10" />
        </div>

        {/* Page Wrapper */}
        <div
          className="
            w-full
            max-w-[1400px]
            mx-auto
            px-3
            sm:px-5
            md:px-6
            lg:px-8
            xl:px-10
            py-4
            sm:py-5
            lg:py-6
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ConsentLayout;