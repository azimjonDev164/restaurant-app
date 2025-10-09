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
  Order,
  Profile,
  Search,
  TableItem,
  Tables,
  Users,
} from "./components";
import Orders from "./components/Orders";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
