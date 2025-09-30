function Profile() {
  const filters = [3, 6, 4, 6, 4, 3, 2];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="border-b-2 border-dashed border-gray-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-white">Profile</h1>
        <p className="text-gray-300 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur,
          excepturi.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 text-white">
        {/* Profile Card */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center w-full md:w-1/3">
          <img
            src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-md mb-4"
          />
          <h2 className="text-2xl font-semibold">Azimjon Polvonov</h2>
          <p className="text-gray-400">Fullstack Developer</p>
        </div>

        {/* Profile Info Table */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex-1 overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="px-4 py-2">Field</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700">
                <td className="px-4 py-2 font-medium">Email</td>
                <td className="px-4 py-2">azimjon@example.com</td>
              </tr>
              <tr className="hover:bg-gray-700">
                <td className="px-4 py-2 font-medium">Location</td>
                <td className="px-4 py-2">Tashkent, Uzbekistan</td>
              </tr>
              <tr className="hover:bg-gray-700">
                <td className="px-4 py-2 font-medium">Skills</td>
                <td className="px-4 py-2">React, Node.js, MongoDB</td>
              </tr>
              <tr className="hover:bg-gray-700">
                <td className="px-4 py-2 font-medium">Experience</td>
                <td className="px-4 py-2">2 Years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Table with Drawer */}
      <div className="mt-6">
        <table className="table-auto w-full text-left border-collapse bg-gray-800 rounded-xl overflow-hidden shadow-lg text-white">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm tracking-wider">
              <th className="px-6 py-3">Tabel</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filters.map((item, idx) => {
              const drawerId = `drawer-row-${idx}`;
              return (
                <tr key={idx} className="hover:bg-gray-700 cursor-pointer">
                  <td colSpan={3} className="p-0">
                    <div className="drawer drawer-end w-full">
                      <input
                        id={drawerId}
                        type="checkbox"
                        className="drawer-toggle"
                      />
                      <div className="drawer-content">
                        {/* Row as button */}
                        <label
                          htmlFor={drawerId}
                          className="flex w-full items-center px-6 py-3 cursor-pointer"
                        >
                          <span className="w-1/3 font-medium">{item}</span>
                          <span className="w-1/3">15:09:25, 3PM</span>
                          <span className="w-1/3">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                              In Progress
                            </span>
                          </span>
                        </label>
                      </div>

                      {/* Drawer Side */}
                      <div className="drawer-side">
                        <label
                          htmlFor={drawerId}
                          aria-label="close sidebar"
                          className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-[#101828] min-h-full w-80 p-6 text-white space-y-3">
                          {/* Header */}
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold">My Orders</h2>
                            <p className="text-sm text-gray-400">
                              Track your tables & meals
                            </p>
                          </div>

                          {/* Ordered Table */}
                          <li>
                            <a className="flex items-center gap-3 hover:bg-[#1E293B] rounded-xl p-3">
                              <i className="fas fa-clipboard-list text-lg"></i>
                              <div>
                                <p className="font-medium">Table</p>
                                <p className="text-sm text-gray-400">
                                  #{item || "Not selected"}
                                </p>
                              </div>
                            </a>
                          </li>

                          {/* Foods */}
                          <li>
                            <a className="flex items-center gap-3 hover:bg-[#1E293B] rounded-xl p-3">
                              <i className="fas fa-utensils text-lg"></i>
                              <div>
                                <p className="font-medium">Foods</p>
                                <p className="text-sm text-gray-400">
                                  2 items ordered
                                </p>
                              </div>
                            </a>
                          </li>

                          {/* Drinks */}
                          <li>
                            <a className="flex items-center gap-3 hover:bg-[#1E293B] rounded-xl p-3">
                              <i className="fas fa-coffee text-lg"></i>
                              <div>
                                <p className="font-medium">Drinks</p>
                                <p className="text-sm text-gray-400">
                                  1 drink ordered
                                </p>
                              </div>
                            </a>
                          </li>

                          {/* Status */}
                          <li>
                            <a className="flex items-center gap-3 hover:bg-[#1E293B] rounded-xl p-3">
                              <i className="fas fa-check-circle text-green-400 text-lg"></i>
                              <div>
                                <p className="font-medium">Status</p>
                                <p className="text-sm text-gray-400">
                                  Preparing...
                                </p>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
