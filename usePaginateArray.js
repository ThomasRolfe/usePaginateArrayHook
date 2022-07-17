import { useState, useEffect, useCallback } from "react";

export default function usePaginateArray(data, pageLength) {
    const [totalPages, setTotalPages] = useState(
        Math.ceil(data.length / pageLength)
    );
    const [pageArray, setPageArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedArray, setPaginatedArray] = useState(data);
    const [currentRange, setCurrentRange] = useState({});

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / pageLength));
        setPaginatedArray(getPaginatedResults);
    }, [data, pageLength, getPaginatedResults]);

    useEffect(() => {
        setPaginatedArray(getPaginatedResults);
    }, [currentPage, getPaginatedResults]);

    useEffect(() => {
        setCurrentRange({
            from: data.length > 0 ? (currentPage - 1) * pageLength + 1 : 0,
            to:
                currentPage * pageLength > data.length
                    ? data.length
                    : currentPage * pageLength,
        });
    }, [paginatedArray, currentPage, data, pageLength]);

    useEffect(() => {
        setPageArray(
            Array(totalPages)
                .fill()
                .map((_, i) => i + 1)
        );
    }, [totalPages]);

    const setNextPage = () => {
        if (currentPage >= totalPages) {
            return;
        }
        setCurrentPage(currentPage + 1);
    };

    const setPrevPage = () => {
        if (currentPage == 1) {
            return;
        }
        setCurrentPage(currentPage - 1);
    };

    const setTargetPage = (target) => {
        if (target < 1 || target > totalPages) {
            setCurrentPage(1);
            return;
        }
        setCurrentPage(target);
    };

    const getPaginatedResults = useCallback(() => {
        return data.slice(
            (currentPage - 1) * pageLength,
            currentPage * pageLength
        );
    }, [data, currentPage, pageLength]);

    return {
        setTargetPage,
        setNextPage,
        setPrevPage,
        paginatedArray,
        currentPage,
        totalPages,
        pageArray,
        currentRange,
    };
}
