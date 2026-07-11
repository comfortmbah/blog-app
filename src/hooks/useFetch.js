import { useState, useEffect } from "react";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Failed to fetch Data.")
                }

                const results = await response.json();
                setData(results);
            } catch(err) {
                console.error(err)
                setError("Something went wrong. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url])

    return { loading, error, data }
}

export default useFetch;