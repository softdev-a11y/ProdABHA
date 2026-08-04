export const USER_INITIATED_STATUS: Record<number, string> = {
  1: "In Progress",
  2: "Completed",
  3: "Failed",
};

export const USER_INITIATED_STEP: Record<number, string> = {
  0: "Discovery Requested",
  1: "Discovery Completed",
  2: "Discovery Response Sent",
  3: "Link Init Requested",
  4: "Link Init Completed",
  5: "Link Confirm Requested",
  6: "Link Completed",
  7: "Failed",
};