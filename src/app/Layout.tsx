import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <header>My App</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
