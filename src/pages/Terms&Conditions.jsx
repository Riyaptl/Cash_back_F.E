// src/pages/TermsAndConditions.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";

export default function TermsAndConditions() {
    const { user } = useSelector((state) => state.auth);

  return (
<>
    {user && <Navbar />}
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <span className="font-semibold">DumYum Chocolates</span>. By
        using our products, services, or participating in our promotional
        activities, you agree to the following Terms and Conditions.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">1. Proof of Purchase</h2>
      <p className="mb-4">
        In the event of any suspicious or disputed activity, customers may be
        required to submit valid proof of purchase. Acceptable proof may include
        invoices, payment receipts, or any official confirmation issued at the
        time of purchase.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">2. Company Rights</h2>
      <p className="mb-4">
        DumYum Chocolates reserves the right to withhold, cancel, or deny any
        payment, benefit, or claim if:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          The customer fails to provide valid proof of purchase upon request.
        </li>
        <li>
          Any fraudulent, suspicious, or unauthorized activity is detected.
        </li>
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        3. Limitation of Liability
      </h2>
      <p className="mb-4">
        The company shall not be held liable for any claims, losses, or disputes
        arising due to false, incomplete, or unverifiable information provided
        by the customer.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Amendments</h2>
      <p>
        These Terms & Conditions may be updated or modified by the company at
        any time without prior notice. Customers are encouraged to review them
        periodically.
      </p>
    </div>
    </>
  );
}
