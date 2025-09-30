import { useNavigate, useParams } from "react-router-dom";

export default function NotificationItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#101828] text-white p-6 flex flex-col">
      {/* Back Button */}
      <button
        className="btn btn-sm btn-outline w-fit mb-6"
        onClick={() => navigate("/notification")}
      >
        ← Back to notifications
      </button>

      {/* Notification Content */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-4">
          <h1 className="text-2xl font-bold">Azimjon Polvonov</h1>
          <span className="text-sm text-gray-400">July 4, 2025</span>
        </div>

        {/* Message */}
        <p className="text-gray-200 leading-relaxed text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit porro
          quisquam voluptate tempore sint vel ullam perspiciatis, consectetur
          rem hic voluptatibus vitae veritatis at. Animi, magni veniam provident
          soluta nesciunt quisquam rem fuga inventore quas? Placeat quibusdam
          consequatur dicta aut!
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button className="btn btn-sm btn-error">Delete</button>
          <button className="btn btn-sm btn-info">Reply</button>
          <button className="btn btn-sm btn-success">Mark as Read</button>
        </div>
      </div>
    </div>
  );
}
