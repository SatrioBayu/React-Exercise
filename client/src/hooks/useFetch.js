import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Unknown Endpoint");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message === "AbortError") {
            console.log("Fetch Aborted");
          } else {
            setError(err.message);
            setLoading(false);
          }
        });
    }, 1000);
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
