"use client";
import { useHttp } from "@/app/components/util/http-hook";
<<<<<<< HEAD
=======
import { useToken } from "@/app/components/util/tokern-hook";
>>>>>>> 878b295663411ba840455dd97eebf030bc590ce6
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EmployeeFormData {
  employee_id: string;
  amount: number;
}

const PostData: React.FC = () => {
  const [pending, setPending] = useState(false);
  const { dataSelecor } = useToken();
  const {
    sendRequest,
    setErorrPesan,
    setErrorValidate,
    errorPesan,
    errorValidate,
  } = useHttp();
  const route = useRouter();
  const adminData = localStorage.getItem("adminData");
  const hasilToken = process.env.NEXT_PUBLIC_ACCES_TOKEN;
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lakukan submit form, misalnya kirim data ke API

    try {
      setErrorValidate(false);
      setPending(true);
      await sendRequest(
        `http://localhost:8001/api_fe/postdata`,
        "POST",
        JSON.stringify([
          { employee_id: +formData.employee_id, amount: +formData.amount },
        ]),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataSelecor}`,
          signature: `${hasilToken}`,
        },
      );
      alert("Data disimpan");
      setFormData({
        employee_id: "",
        amount: 0,
      });
    } catch (err: unknown) {
      setErrorValidate(true);
      setErorrPesan(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <br />
      <p className="text-center block text-gray-700 font-bold mb-2">
        POST DATA TRANSAKSI
      </p>

      <p className="text-center bg-red-800">
        {errorValidate ? errorPesan : ""}
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
          disabled={pending}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          {pending ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostData;
