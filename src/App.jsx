import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import {
  AddCard,
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

          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="notification">
            <Route index element={<Notification />} />
            <Route path=":id" element={<NotificationItem />} />
          </Route>
          <Route path="/users" element={<Users />} />
          <Route path="/addcards" element={<AddCard />} />
          <Route path="/search" element={<Search />} />

          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
