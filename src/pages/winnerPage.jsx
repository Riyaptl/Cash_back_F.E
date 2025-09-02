import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWinners, clearSerial } from "../slice/winnerSlice"; // ✅ import clearSerial
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const WinnerPage = () => {
  const dispatch = useDispatch();
  const { winners, loading, error, totalPages } = useSelector(
    (state) => state.winners
  );

  const [searchNumber, setSearchNumber] = useState("");
  const [searchWinnerName, setSearchWinnerName] = useState("");
  const [searchWinnerUpi, setSearchWinnerUpi] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadWinners = async () => {
      try {
        const response = await dispatch(fetchWinners({ page })).unwrap();
        toast.success(response.message);
      } catch (err) {
        toast.error(err.message || "Failed to fetch winners");
      }
    };

    loadWinners();
  }, [dispatch, page]);

  // 🔍 Combined filtering logic (frontend filter)
  const filteredWinners = winners.filter((winner) => {
    const matchesNumber = winner.number?.number
      ?.toString()
      .toLowerCase()
      .includes(searchNumber.toLowerCase());

    const matchesWinnerName = winner.name
      ? winner.name.toLowerCase().includes(searchWinnerName.toLowerCase())
      : false;

    const matchesWinnerUpi = winner.upi
      ? winner.upi.toLowerCase().includes(searchWinnerUpi.toLowerCase())
      : false;

    return (
      matchesNumber &&
      (searchWinnerName ? matchesWinnerName : true) &&
      (searchWinnerUpi ? matchesWinnerUpi : true)
    );
  });

const handleClearSerial = async (number) => {
  const confirmed = window.confirm("Are you sure you want to clear this serial?");
  if (!confirmed) return; // stop if user cancels

  try {
    const res = await dispatch(clearSerial({ number })).unwrap();
    toast.success(res.message || "Serial cleared successfully");
    // refresh winners after clearing
    dispatch(fetchWinners({ page }));
  } catch (err) {
    toast.error(err.message || "Failed to clear serial");
  }
};


  return (
    <div className="p-6">
      <Navbar />
      <h2 className="text-2xl font-semibold mb-4">Winners List</h2>

      {loading && <p>Loading...</p>}

      {/* 🔍 Filters & Search */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Number..."
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="text"
          placeholder="Search by Winner Name..."
          value={searchWinnerName}
          onChange={(e) => setSearchWinnerName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:ring-2 focus:ring-amber-500"
        />
        <input
          type="text"
          placeholder="Search by Winner UPI..."
          value={searchWinnerUpi}
          onChange={(e) => setSearchWinnerUpi(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="p-3 border-b">Winner Name</th>
              <th className="p-3 border-b">Winner UPI</th>
              <th className="p-3 border-b">Number</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Claimed At</th>
              <th className="p-3 border-b">Cleared At</th>
              <th className="p-3 border-b text-center">Action</th> {/* ✅ new column */}
            </tr>
          </thead>
          <tbody>
            {filteredWinners.length > 0 ? (
              filteredWinners.map((winner) => (
                <tr
                  key={winner._id}
                  className="hover:bg-gray-50 text-sm text-gray-800"
                >
                  <td className="p-3 border-b">{winner.name || "—"}</td>
                  <td className="p-3 border-b">{winner.upi || "—"}</td>
                  <td className="p-3 border-b">{winner.number?.number || "—"}</td>
                  <td className="p-3 border-b">{winner.number?.price || "—"}</td>
                  <td className="p-3 border-b">{winner.number?.status || "—"}</td>
                  <td className="p-3 border-b">
                    {winner.number?.claimedAt
                      ? new Date(winner.number.claimedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-3 border-b">
                    {winner.number?.clearedAt
                      ? new Date(winner.number.clearedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleClearSerial(winner.number.number)}
                      className="px-3 py-1 text-md bg-amber-600 hover:bg-amber-700 text-white rounded"
                    >
                      Clear Serial
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-4 text-center text-gray-500 italic"
                >
                  No winners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() =>
            setPage((p) => (totalPages ? Math.min(p + 1, totalPages) : p + 1))
          }
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WinnerPage;
