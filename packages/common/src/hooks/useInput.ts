import { ChangeEvent, useEffect, useState } from "react";

const useInput = <T>(initialValue: T, positiveValue = false) => {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        if (typeof value === "string") {
            setValue(inputValue as T);
        }
        if (typeof value === "number") {
            const filteredValue = inputValue.replace(/\D/g, "");
            let numberValue = +filteredValue;
            if (positiveValue && numberValue < 0) numberValue = 0;
            setValue(numberValue as T);
        }
    };

    return {
        value,
        onChange,
    };
};

export default useInput;
