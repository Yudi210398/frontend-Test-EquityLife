import { useState } from "react";

export function useHttp() {
  const [errorValidate, setErrorValidate] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errorPesan, setErorrPesan] = useState<any>("");
  const [pesanVerify, setPesanVerify] = useState("");
  const sendRequest = async (
    url: string,
    method = "GET",
    body: string | null = null,
    headers: HeadersInit = {}
  ) => {
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const responseData = await response.json();
      if (!response.ok || response?.statusCode)
        throw new Error(responseData.message);
      return responseData;
    } catch (err: unknown) {
      // Gunakan 'unknown' jika Anda tidak yakin apa tipe error
      if (err instanceof Error) {
        setPesanVerify(err.message);
        throw err.message;
      } else {
        setPesanVerify("Unknown error occurred");
        throw "Unknown error occurred";
      }
    }
  };

  return {
    pesanVerify,
    errorValidate,
    sendRequest,
    setErrorValidate,
    errorPesan,
    setErorrPesan,
  };
}
