import { useRouter, useSearchParams } from "next/navigation";
export const useTableFN = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`?${params.toString()}`);
    };

    const handlePageChange = (newPage: number, perPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        params.set("per_page", perPage.toString());
        router.push(`?${params.toString()}`);
    };

    const handlePerPageChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("per_page", value.toString());
        router.push(`?${params.toString()}`);
    };

    return {
        updateFilter,
        handlePageChange,
        handlePerPageChange
    };
};
