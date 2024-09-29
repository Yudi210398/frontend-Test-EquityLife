"use client";
import { useHttp } from "@/app/components/util/http-hook";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EmployeeFormData {
  employee_id: string;
  amount: number;
}

const PostData: React.FC = () => {
  const route = useRouter();
  const adminData = localStorage.getItem("adminData");
  const dataBrowser = adminData ? JSON.parse(adminData) : null;
  if (!dataBrowser) route.push("/");
  const [formData, setFormData] = useState<EmployeeFormData>({
    employee_id: "",
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lakukan submit form, misalnya kirim data ke API

    try {
    } catch (err: unknown) {}
  };

  return (
    <div>
      <br />
      <p className="text-center block text-gray-700 font-bold mb-2">
        POST DATA TRANSAKSI
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="employee_id"
            className="block text-gray-700 font-bold mb-2"
          >
            Employee ID
          </label>
          <input
            type="text"
            id="employee_id"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            min={0}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostData;
