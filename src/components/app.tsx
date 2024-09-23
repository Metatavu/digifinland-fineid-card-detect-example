import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home";
import DemoScreen from "./screens/demo";
import BasicLayout from "./layouts/basic-layout";
import AuthenticationProvider from "./auth/auth-provider";
import NotFound from "./screens/not-found";

/**
 * Application component.
 */
export default () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="demo" element={
            <AuthenticationProvider>
              <DemoScreen />
            </AuthenticationProvider>
          } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}