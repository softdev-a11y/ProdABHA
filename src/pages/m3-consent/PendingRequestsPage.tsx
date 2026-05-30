import { useState } from "react";

import { useNavigate } from "react-router-dom";

import ConsentLayout from "../../components/m3-consent/layout/ConsentLayout";

import PendingRequestCard from "../../components/m3-consent/pending-requests/PendingRequestCard";

import ApprovedRequestCard from "../../components/m3-consent/pending-requests/ApprovedRequestCard";

const pendingRequests = [
  {
    id: "REQ-1001",
    patient: "john@sbx",
    purpose: "Care Management",
    requestedAt: "2 mins ago",
  },
  {
    id: "REQ-1002",
    patient: "dhananjay07@sbx",
    purpose: "Treatment",
    requestedAt: "5 mins ago",
  },
  {
    id: "REQ-1003",
    patient: "rajesh@sbx",
    purpose: "Insurance",
    requestedAt: "8 mins ago",
  },
  {
    id: "REQ-1004",
    patient: "mahesh@sbx",
    purpose: "Care Management",
    requestedAt: "10 mins ago",
  },
  {
    id: "REQ-1005",
    patient: "suresh@sbx",
    purpose: "Treatment",
    requestedAt: "12 mins ago",
  },
  {
    id: "REQ-1006",
    patient: "kiran@sbx",
    purpose: "Insurance",
    requestedAt: "15 mins ago",
  },
];

const approvedRequests = [
  {
    id: "REQ-0998",
    patient: "mahesh@sbx",
    purpose: "Care Management",
  },
];

const ITEMS_PER_PAGE = 3;

const PendingRequestsPage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages = Math.ceil(
    pendingRequests.length /
      ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const currentRequests =
    pendingRequests.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  return (
    <ConsentLayout currentStep={4}>
      <div className="max-w-[1180px] w-full space-y-6">

        {/* Header */}
        <div className="bg-white border border-[#e5e7eb] rounded-[18px] shadow-sm p-5 sm:p-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h1 className="text-[20px] sm:text-[24px] font-bold text-[#111827] leading-tight">
                Pending Requests
              </h1>

              <p className="text-[14px] text-[#6b7280] mt-2 leading-relaxed">
                View and manage all your pending consent requests
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/m3/search-patient")
              }
              className="h-[36px] px-3 rounded-[8px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-semibold sm:w-auto"
            >
              + New Request Consent
            </button>

          </div>
        </div>

        {/* Pending Section */}
        <div className="bg-white border border-[#e5e7eb] rounded-[18px] shadow-sm overflow-hidden">

          {/* Section Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7]">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <h2 className="text-[20px] font-bold text-[#111827]">
                  Pending Consent Requests
                </h2>

                <p className="text-[13px] text-[#6b7280] mt-1">
                  Requests waiting for patient approval
                </p>
              </div>

              <div className="bg-[#eff6ff] text-[#2563eb] px-3 py-2 rounded-[10px] text-[12px] font-medium w-fit">
                Polling every 3 seconds
              </div>

            </div>
          </div>

          {/* Cards */}
          <div className="p-5 sm:p-6 space-y-4">

            {currentRequests.map((request) => (
              <PendingRequestCard
                key={request.id}
                id={request.id}
                patient={request.patient}
                purpose={request.purpose}
                requestedAt={request.requestedAt}
              />
            ))}

          </div>

          {/* Pagination */}
          <div className="px-5 sm:px-6 py-4 border-t border-[#eef2f7] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <p className="text-[13px] text-[#6b7280]">
              Showing{" "}
              <span className="font-semibold text-[#111827]">
                {startIndex + 1}
              </span>
              {" "}to{" "}
              <span className="font-semibold text-[#111827]">
                {Math.min(
                  startIndex +
                    ITEMS_PER_PAGE,
                  pendingRequests.length
                )}
              </span>
              {" "}of{" "}
              <span className="font-semibold text-[#111827]">
                {pendingRequests.length}
              </span>
              {" "}requests
            </p>

            <div className="flex items-center gap-2">

              {/* Previous */}
              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }
                disabled={
                  currentPage === 1
                }
                className={`h-[38px] px-4 rounded-[10px] text-[13px] font-medium border transition-all ${
                  currentPage === 1
                    ? "border-[#e5e7eb] text-[#cbd5e1] cursor-not-allowed"
                    : "border-[#d1d5db] text-[#374151] hover:bg-[#f8fafc]"
                }`}
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({
                length: totalPages,
              }).map((_, index) => {
                const page =
                  index + 1;

                return (
                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                    className={`w-[38px] h-[38px] rounded-[10px] text-[13px] font-semibold transition-all ${
                      currentPage ===
                      page
                        ? "bg-[#2563eb] text-white"
                        : "border border-[#d1d5db] text-[#374151] hover:bg-[#f8fafc]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                className={`h-[38px] px-4 rounded-[10px] text-[13px] font-medium border transition-all ${
                  currentPage ===
                  totalPages
                    ? "border-[#e5e7eb] text-[#cbd5e1] cursor-not-allowed"
                    : "border-[#d1d5db] text-[#374151] hover:bg-[#f8fafc]"
                }`}
              >
                Next
              </button>

            </div>
          </div>
        </div>

        {/* Approved Section */}
        <div className="bg-white border border-[#e5e7eb] rounded-[18px] shadow-sm overflow-hidden">

          {/* Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-[#eef2f7]">

            <div className="flex items-center justify-between gap-3">

              <div>
                <h2 className="text-[20px] font-bold text-[#111827]">
                  Recently Approved
                </h2>

                <p className="text-[13px] text-[#6b7280] mt-1">
                  Approved requests ready to view
                </p>
              </div>

            </div>
          </div>

          {/* Cards */}
          <div className="p-5 sm:p-6 space-y-4">

            {approvedRequests.map((request) => (
              <ApprovedRequestCard
                key={request.id}
                id={request.id}
                patient={request.patient}
                purpose={request.purpose}
                onView={() =>
                  navigate("/m3/view-records")
                }
              />
            ))}

          </div>
        </div>

      </div>
    </ConsentLayout>
  );
};

export default PendingRequestsPage;