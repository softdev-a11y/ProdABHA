    import { BrowserRouter, Routes, Route } from "react-router-dom";
    import LoginPage from "../pages/Login/LoginPage";
    import DashboardPage from "../pages/Dashboard/DashboardPage";
    import MainLayout from "../layouts/MainLayout";
    import ModulePage from "../pages/Module/ModulePage";
    import RegistrationPage from "../pages/Registration/RegistrationPage";
    import ProtectedRoutes from "./ProtectedRoute";
    import NotFound from "../pages/NotFound/NotFound";
    import GetDetailsPage from "../pages/Registration/GetDetailsPage";
    import UnitSubscriptionPage from "../pages/Module/UnitSubscriptionPage";
    import AbhaVerificationPage from "../pages/Registration/AbhaVerificationPage";
    import LinkAbhaPage from "../pages/Registration/LinkAbhaPage";
    import AbhaCardPage from "../pages/Card/AbhaCardPage";
    import LinkedPatientsPage from "../pages/m2-care/LinkedPatientsPage";
    import PatientRecordListingPage from "../pages/m2-care/PatientRecordListingPage";
    import ProcessingPage from "../pages/m2-care/ProcessingPage";
    import SuccessPage from "../pages/m2-care/SuccessPage";
    import LinkedHistoryPage from "../pages/m2-care/LinkedHistoryPage";

    import RequestConsentPage from "../pages/m3-consent/RequestConsentPage";
    import RequestListPage from "../pages/m3-consent/RequestListPage";
    import ConsentDetailsPage from "../pages/m3-consent/ConsentDetailsPage";
    import SearchPatientPage from "../pages/m3-consent/SearchPatientPage";
    import ViewDataPage from "../pages/m3-consent/ViewDataPage";
    import ViewHealthRecordPage from "../pages/m3-consent/ViewHealthRecordPage";
    import DeepLinkNotificationPage from "../pages/m2-care/DeepLinkNotificationPage";
    import UserInitiatedTransactionsPage from "../pages/m2-care/UserInitiatedTransactionsPage";
    import AbdmCounterPage from "../pages/m2-care/AbdmCounterPage";

    const AppRoutes = () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route element={<MainLayout />}>
              <Route
                path="/module"
                element={
                  <ProtectedRoutes>
                    <ModulePage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/unitsubscription"
                element={
                  <ProtectedRoutes>
                    <UnitSubscriptionPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutes>
                    <DashboardPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/registration"
                element={
                  <ProtectedRoutes>
                    <RegistrationPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/getdetails"
                element={
                  <ProtectedRoutes>
                    <GetDetailsPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/abhaverification"
                element={
                  <ProtectedRoutes>
                    <AbhaVerificationPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/linkabhaverification"
                element={
                  <ProtectedRoutes>
                    <LinkAbhaPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/getabhacard"
                element={
                  <ProtectedRoutes>
                    <AbhaCardPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/linkedpatients"
                element={
                  <ProtectedRoutes>
                    <LinkedPatientsPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/patientrecords"
                element={
                  <ProtectedRoutes>
                    <PatientRecordListingPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/processing"
                element={
                  <ProtectedRoutes>
                    <ProcessingPage />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/success"
                element={
                  <ProtectedRoutes>
                    <SuccessPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/deeplinknotification"
                element={
                  <ProtectedRoutes>
                    <DeepLinkNotificationPage />
                  </ProtectedRoutes>
                }
              />

              <Route
              path="/m3/search-patient"
              element={<SearchPatientPage />}
            />

              <Route
                path="/m3/view-data"
                element={<ViewDataPage />}
              />

              <Route
              path="/m3/view-health-record"
              element={<ViewHealthRecordPage />}
            />

              <Route
                path="/linkedhistory"
                element={
                  <ProtectedRoutes>
                    <LinkedHistoryPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/internal/user-initiated-transactions"
                element={
                  <ProtectedRoutes>
                    <UserInitiatedTransactionsPage />
                  </ProtectedRoutes>
                }
              />

              <Route
              path="/internal/abdm-counter"
              element={
                <ProtectedRoutes>
                  <AbdmCounterPage />
                </ProtectedRoutes>
              }
            />

          
            <Route
            path="/m3/request-consent"
            element={<RequestConsentPage />}
          />

          <Route
            path="/m3/request-list"
            element={<RequestListPage />}
          />

          <Route
            path="/m3/consent-details"
            element={<ConsentDetailsPage />}
          />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
    };

    export default AppRoutes;
