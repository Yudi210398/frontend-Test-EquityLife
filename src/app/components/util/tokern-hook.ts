import { RootStates } from "@/app/store";
import { setToken } from "@/app/store/authSlice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useToken() {
  const dispatch = useDispatch();

  // Memoisasi fungsi login untuk set token
  const onlogin = useCallback(
    (token: string) => dispatch(setToken({ token })),
    [dispatch],
  );

  useEffect(() => {
    // Ambil data token dari localStorage
    const dataTokenString = localStorage.getItem("adminData");

    try {
      const dataToken = dataTokenString ? JSON.parse(dataTokenString) : null;

      // Jika token valid dan belum expired
      if (dataToken?.token && dataToken?.tokenexpied > new Date().getTime()) {
        onlogin(dataToken?.token); // Simpan token ke state redux
      } else {
        localStorage.removeItem("adminData"); // Hapus data jika token expired
      }
    } catch (error) {
      console.error("Failed to parse token from localStorage", error);
      localStorage.removeItem("adminData"); // Hapus jika parsing gagal
    }
  }, [onlogin]);

  // Mengambil token dari state Redux
  const dataSelecor = useSelector((state: RootStates) => state.auth.token);

  return { dataSelecor };
}
