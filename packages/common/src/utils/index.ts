export const filterExcludeNull = <T>(data: (T | null | undefined)[]): T[] => {
    const filteredData: T[] = [];
    data.forEach((item) => {
        if (item !== null && item !== undefined) filteredData.push(item);
    });
    return filteredData;
};
