import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PageNotFound from "./pages/PageNotFound";
import Login from "./features/authentication/Login";
import SignUp from "./features/authentication/SignUp";
import AppLayoutUser from "./pages/AppLayoutUser";
import SelectSubCategory from "./pages/SelectSubCategory";
import Dashboard from "./pages/Dashboard";
import DifficultyPicker from "./pages/DifficultyPicker";
import QuizScreen from "./features/quizscreen/QuizScreen";
import ScoreDisplay from "./ui/ScoreDisplay";
import AnswerReview from "./pages/AnswerReview";
import ProtectedRoute from "./ui/ProtectedRoutes";
import { Toaster } from "react-hot-toast";
import About from "./ui/About";
import Home from "./ui/Home";
import FeaturesPage from "./ui/FeaturesPage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="home/about" element={<About />} />
              <Route path="home/features" element={<FeaturesPage />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppLayoutUser />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="dashboard/subcategory/:d"
                element={<SelectSubCategory />}
              />
              <Route
                path="dashboard/:d/quiz-mode"
                element={<DifficultyPicker />}
              />
              <Route path="quiz" element={<QuizScreen />} />
              <Route path="quiz/result" element={<ScoreDisplay />} />
              <Route path="quiz/answer-review" element={<AnswerReview />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-white)",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
