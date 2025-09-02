import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSerials } from "../slice/serialSlice";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const SerialPage = () => {
  const dispatch = useDispatch();
  const { serials, loading, error, totalPages } = useSelector(
    (state) => state.serials
  );

  const [searchNumber, setSearchNumber] = useState("");
  const [searchWinnerName, setSearchWinnerName] = useState("");
  const [searchWinnerUpi, setSearchWinnerUpi] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadSerials = async () => {
      try {
        const response = await dispatch(
          fetchSerials({ status: statusFilter, price: priceFilter, page })
        ).unwrap();
        toast.success(response.message);
      } catch (err) {
        toast.error(err.message || "Failed to fetch serials");
      }
    };

    loadSerials();
  }, [dispatch, statusFilter, priceFilter, page]);

  // 🔍 Combined filtering logic (frontend filter)
  const filteredSerials = serials.filter((serial) => {
    const matchesNumber = serial.number
      .toString()
      .toLowerCase()
      .includes(searchNumber.toLowerCase());
    const matchesWinnerName = serial.winner?.name
      ? serial.winner.name.toLowerCase().includes(searchWinnerName.toLowerCase())
      : false;
    const matchesWinnerUpi = serial.winner?.upi
      ? serial.winner.upi.toLowerCase().includes(searchWinnerUpi.toLowerCase())
      : false;

    return (
      matchesNumber &&
      (searchWinnerName ? matchesWinnerName : true) &&
      (searchWinnerUpi ? matchesWinnerUpi : true)
    );
  });

  return (
    <div className="p-6">
      <Navbar/>
      <h2 className="text-2xl font-semibold mb-4">Serials List</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

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

        <div className="flex items-center">
          <label className="mr-2 font-medium">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
          >
            <option value="">All</option>
            <option value="unclaimed">Unclaimed</option>
            <option value="claimed">Claimed</option>
            <option value="cleared">Cleared</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2 font-medium">Price:</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
          >
            <option value="">All</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="99">99</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="p-3 border-b">Number</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Winner Name</th>
              <th className="p-3 border-b">Winner UPI</th>
              <th className="p-3 border-b">Created At</th>
              <th className="p-3 border-b">Claimed At</th>
              <th className="p-3 border-b">Cleared At</th>
            </tr>
          </thead>
          <tbody>
            {filteredSerials.length > 0 ? (
              filteredSerials.map((serial) => (
                <tr
                  key={serial._id}
                  className="hover:bg-gray-50 text-sm text-gray-800"
                >
                  <td className="p-3 border-b">{serial.number}</td>
                  <td className="p-3 border-b">{serial.price}</td>
                  <td className="p-3 border-b">{serial.status}</td>
                    <td className="p-3 border-b">{serial.winner?.name || "—"}</td>
                    <td className="p-3 border-b">{serial.winner?.upi || "—"}</td>
                  <td className="p-3 border-b">
                    {serial.createdAt
                      ? new Date(serial.createdAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-3 border-b">
                    {serial.claimedAt
                      ? new Date(serial.claimedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-3 border-b">
                    {serial.clearedAt
                      ? new Date(serial.clearedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="p-4 text-center text-gray-500 italic"
                >
                  No serials found
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
          onClick={() => setPage((p) => (totalPages ? Math.min(p + 1, totalPages) : p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SerialPage;
