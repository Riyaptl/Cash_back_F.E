// src/pages/TermsAndConditions.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
    const { user } = useSelector((state) => state.auth);

  return (
<>
    {user && <Navbar />}
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Terms & Conditions
        </h1>

        <section>
          <h2 className="text-lg font-semibold mb-2">1. Proof of Purchase</h2>
          <p className="text-sm leading-relaxed">
            In the event of any suspicious or disputed activity, customers may be required to provide
            valid proof of purchase. Acceptable proof may include invoices, receipts, or any official
            confirmation issued at the time of purchase.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. Company Rights</h2>
          <p className="text-sm leading-relaxed">
            DumYum Chocolates reserves the right to withhold, cancel, or deny any payment, benefit, or
            claim if:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 mt-2">
            <li>The customer fails to provide valid proof of purchase upon request.</li>
            <li>Any fraudulent, suspicious, or unauthorized activity is detected.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed">
            The company shall not be held liable for any claims, losses, or disputes arising due to
            false, incomplete, or unverifiable information provided by the customer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">4. Jurisdiction</h2>
          <p className="text-sm leading-relaxed">
            Any disputes, claims, or proceedings arising from these Terms & Conditions shall fall under
            the exclusive jurisdiction of the courts of Ahmedabad, India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">5. Amendments</h2>
          <p className="text-sm leading-relaxed">
            These Terms & Conditions may be updated or modified by the company at any time without
            prior notice. Customers are encouraged to review them periodically.
          </p>
        </section>

        <div className="pt-4 border-t">
          <Link
            to="/claim"
            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
          >
            ← Back to Claim Reward
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
