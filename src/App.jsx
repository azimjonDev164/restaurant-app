import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import {
  AddCard,
  Dashboard,
  NotFound,
  Notification,
  NotificationItem,
  Profile,
  Search,
  TableItem,
  Tables,
  Users,
} from "./components";
import Orders from "./components/Orders";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react"; // ✅ add useUser
import API from "./services/api";

function App() {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser(); // ✅ useUser hook to get user info

  useEffect(() => {
    async function syncUser() {
      if (!isSignedIn || !user) return;

      try {
        const token = await getToken();

        // ✅ send user data to backend properly
        await API.post(
          "/user",
          {
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ User synced with backend");
      } catch (error) {
        console.error("❌ Sync error:", error.message);
      }
    }

    // ✅ call the function
    syncUser();
  }, [isSignedIn, user, getToken]); // ✅ add dependencies

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tables">
          <Route index element={<Tables />} />
          <Route path=":id" element={<TableItem />} />
        </Route>

        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="notification">
          <Route index element={<Notification />} />
          <Route path=":id" element={<NotificationItem />} />
        </Route>
        <Route path="/users" element={<Users />} />
        <Route path="/addcards" element={<AddCard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
