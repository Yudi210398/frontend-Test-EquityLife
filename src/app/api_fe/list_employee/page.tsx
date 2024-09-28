"use client";
import { useHttp } from "@/app/components/util/http-hook";
import { useToken } from "@/app/components/util/tokern-hook";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Employee {
  employee_id: number;
  employee_name: string;
  manager_name?: string | null;
  path_level: string;
  employee_format: string;
  path_hierarchy: string;
}
export default function ListEmployee() {
  const route = useRouter();
  /* eslint-disable */
  const adminData = localStorage.getItem("adminData");
  const dataBrowser = adminData ? JSON.parse(adminData) : null;
  if (!dataBrowser) route.push("/");
  const hasilToken = process.env.NEXT_PUBLIC_ACCES_TOKEN;

  const { dataSelecor } = useToken();

  const { sendRequest } = useHttp();
  const [getDatass, setGetData] = useState<Employee[]>([]);

  const fetchData = useCallback(async () => {
    console.log(dataSelecor);
    try {
      const getData = await sendRequest(
        `http://localhost:8001/api_fe/list_employee`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataSelecor}`,
          signature: `${hasilToken}`,
        }
      );
      setGetData(getData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [sendRequest, dataSelecor, hasilToken]);

  // Panggil fetchData saat komponen pertama kali dirender
  if (getDatass.length === 0) {
    fetchData();
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Employee ID</th>
            <th className="py-2 px-4 text-left">Employee Name</th>
            <th className="py-2 px-4 text-left">Manager Name</th>
            <th className="py-2 px-4 text-left">Path Level</th>
            <th className="py-2 px-4 text-left">Employee Format</th>
            <th className="py-2 px-4 text-left">Path Hierarchy</th>
          </tr>
        </thead>
        <tbody>
          {getDatass.map((employee) => (
            <tr key={employee.employee_id} className="border-b">
              <td className="py-2 px-4">{employee.employee_id}</td>
              <td className="py-2 px-4">{employee.employee_name}</td>
              <td className="py-2 px-4">{employee.manager_name || "(null)"}</td>
              <td className="py-2 px-4">{employee.path_level}</td>
              <td className="py-2 px-4">{employee.employee_format}</td>
              <td className="py-2 px-4">{employee.path_hierarchy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
