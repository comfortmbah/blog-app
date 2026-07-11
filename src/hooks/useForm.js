import { useState } from "react";

function useForm (initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setValues((prevValue) => ({ ...prevValue, [name]: value }));
    }

    function handleSubmit(onSubmit) {
        return (event) => {
            event.preventDefault();

            const validationErrors = validate(values);
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length === 0) {
                onSubmit(values);
                setSuccess('Message sent successfully!')
                setValues(initialValues)
            } else {
                setSuccess("")
            }
        }
    }

    return {
        values,
        errors,
        success,
        handleChange,
        handleSubmit,
    }
};


export default useForm;