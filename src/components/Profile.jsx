import { useUser } from "@clerk/clerk-react";

function Profile() {
  const filters = [3, 6, 4, 6, 4, 3, 2];
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <p className="w-full h-full flex justify-center items-center text-3xl text-white">
        Loading user...
      </p>
    );
  }

  if (!isSignedIn) {
    return (
      <p className="w-full h-full flex justify-center items-center text-3xl text-white">
        Please sign in.
      </p>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="border-b-2 border-dashed border-gray-600 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-white">Profile</h1>
        <p className="text-gray-300 mt-2">Welcome to your profile page</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 text-white">
        {/* Profile Card */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center w-full md:w-1/3">
          <img
            src={user.imageUrl}
            onError={(e) => {
              e.target.src =
                "https://avatars.githubusercontent.com/u/9919?s=200&v=4";
            }}
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-md mb-4"
          />
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          {/* <p className="text-gray-400">{user.emailAddresses[0].emailAddress}</p> */}
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
                <td className="px-4 py-2">
                  {user.emailAddresses[0].emailAddress}
                </td>
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
    </div>
  );
}

export default Profile;
