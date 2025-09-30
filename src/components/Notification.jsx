import {
  faEllipsisVertical,
  faTrash,
  faReply,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-4 space-y-4">
      {[2, 3, 4, 5, 6, 7].map((_, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 p-4 rounded-2xl shadow-md bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all cursor-pointer"
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-blue-500 cursor-pointer"
          />

          {/* Content */}
          <div
            className="flex-1"
            onClick={() => navigate(`/notification/${idx + 1}`)}
          >
            <h1 className="text-white font-semibold text-lg">
              Azimjon Polvonov
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit....
            </p>
          </div>

          {/* Date + Menu */}
          <div className="flex flex-row justify-center items-center h-full gap-2">
            <h3 className=" text-gray-500 whitespace-nowrap">July 4, 2025</h3>

            {/* Three dots dropdown */}
            <div className="dropdown dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-sm bg-transparent hover:bg-gray-500 text-gray-300 border-none hover:text-white shadow-none"
              >
                <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-gray-900 rounded-xl w-36 space-y-1"
              >
                <li>
                  <button className="flex items-center gap-2 text-red-400 hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </li>
                <li>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-500">
                    <FontAwesomeIcon icon={faReply} />
                    Reply
                  </button>
                </li>
                <li>
                  <button className="flex items-center gap-2 text-green-400 hover:text-green-500">
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
