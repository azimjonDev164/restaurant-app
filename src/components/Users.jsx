import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  return (
    <div className="overflow-x-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Users Management</h1>

      <table className="table table-md text-xl text-gray-300">
        <thead>
          <tr className="bg-gray-800 text-gray-200">
            <th>#</th>
            <th>Name</th>
            <th>Table</th>
            <th>Company</th>
            <th>Location</th>
            <th>Last Login</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="hover:bg-gray-800 cursor-pointer">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Littel, Schaden and Vandervort</td>
            <td>Canada</td>
            <td>12/16/2020</td>
            <td>Blue</td>
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

          <tr className="hover:bg-gray-800 cursor-pointer">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Zemlak, Daniel and Leannon</td>
            <td>United States</td>
            <td>12/5/2020</td>
            <td>Purple</td>
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
        </tbody>
      </table>
    </div>
  );
}
