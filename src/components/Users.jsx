import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useUser from "../hooks/useUser.js";

export default function Users() {
  const { data, err, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-3xl font-semibold text-white animate-pulse">
          Loading your users...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Users Management</h1>

      <table className="table table-md text-xl text-gray-300">
        <thead>
          <tr className="bg-gray-800 text-gray-200">
            <th>Name</th>
            <th>email</th>
            <th>role</th>
            <th>created time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-400">
                Loading users...
              </td>
            </tr>
          ) : err ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-red-400">
                {err}
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item) => (
              <tr className="hover:bg-gray-800 cursor-pointer">
                <th>{item?.name}</th>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td>
                  {" "}
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <button
                      tabIndex={0}
                      className="btn btn-ghost btn-xs text-gray-200"
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-gray-800 text-gray-200 rounded-box w-32"
                    >
                      <li>
                        <a>
                          <FontAwesomeIcon
                            icon={faEye}
                            className="mr-2 text-blue-400"
                          />
                          View
                        </a>
                      </li>
                      <li>
                        <a>
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="mr-2 text-green-400"
                          />
                          Edit
                        </a>
                      </li>
                      <li>
                        <a className="text-red-400">
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            ""
          )}
        </tbody>
      </table>
    </div>
  );
}
