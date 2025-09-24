import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";   // 🎉 use this one
import { checkSerial, claimSerial } from "../slice/serialSlice";
import Navbar from "../components/Navbar";

const ClaimRewardPage = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.serials);
  const { user } = useSelector((state) => state.auth);

  const [serialNumber, setSerialNumber] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [upi, setUpi] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🎉 fire confetti from bottom corners
  const fireConfetti = () => {
    // left corner
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 1 } // bottom-left
    });
    // right corner
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 1 } // bottom-right
    });
  };

  const handleCheck = async () => {
    if (!serialNumber) {
      toast.error("Please enter a serial number");
      return;
    }
    setLoading(true);
    try {
      const res = await dispatch(checkSerial({ number: serialNumber })).unwrap();
      setPrice(res.price);
      setStep(2);
      fireConfetti(); // 🎉 trigger on success
    } catch (err) {
      toast.error(err.message || "Failed to check serial");
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!name || !upi) {
      toast.error("Please enter name and UPI ID");
      return;
    }
    setLoading(true);
    try {
      const confirmed = window.confirm(
        "Please check your mobile number or UPI ID twice before submitting."
      );
      if (!confirmed) return;

      await dispatch(claimSerial({ number: serialNumber, name, upi })).unwrap();
      setStep(1);
      setSerialNumber("");
      setName("");
      setUpi("");
      setPrice(null);
    } catch (err) {
      toast.error(err.message || "Failed to claim reward");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user && <Navbar />}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {message ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <p className="text-lg font-semibold text-green-600">{message}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {step === 1 && (
                <>
                  <h2 className="text-center text-2xl font-bold text-purple-700 mb-4 font-montserrat">
                    Claim Your Reward Here 🎁
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter Serial Number"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="w-full border rounded-xl p-3 text-center text-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleCheck}
                      disabled={loading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-semibold disabled:opacity-50"
                    >
                      {loading ? "Checking..." : "Check Serial Number"}
                    </button>
                    <p className="text-sm text-gray-500 text-center mt-1">
                      For any dispute or payment-related concerns, please contact us on{" "}
                      <span className="text-purple-600 font-medium">+91 8000440250</span>.
                    </p>
                  </div>

                </>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <p className="text-xl font-semibold text-green-700 font-montserrat">
                      YAY! You have won ₹{price} 🎉
                    </p>
                    <p className="mt-2 text-xs font-semibold text-purple-700 mb-4 font-montserrat">
                      To claim your reward, enter below details.
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="UPI linked Mobile number or UPI ID"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-500"
                  />
                  <button
                    onClick={handleClaim}
                    disabled={loading}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl font-semibold disabled:opacity-50"
                  >
                    {loading ? "Claiming..." : "Claim Reward"}
                  </button>
                  <p className="text-sm text-gray-500 text-center mt-1">
                      For any dispute or payment-related concerns, please contact us on{" "}
                      <span className="text-purple-600 font-medium">+91 8000440250</span>.
                    </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ClaimRewardPage;
