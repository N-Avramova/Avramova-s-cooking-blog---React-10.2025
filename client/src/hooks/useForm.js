import { useState } from "react";

export default function useForm(callbackFunction, initialValues) {
    const [values, setValues] = useState(initialValues);

    const changeFormHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const formActionHandler = (formData) => {
        callbackFunction(values, formData);
    }

    const registerValueData = (fieldName) => {
        return {
            name: fieldName,
            onChange: changeFormHandler,
            value: values[fieldName],
        }
    }

    return {
        values,
        setValues,
        registerValueData,
        changeFormHandler,
        formActionHandler,
    }
}
