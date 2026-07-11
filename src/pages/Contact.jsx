import Alert from "../components/Alert"
import FormInputs from '../components/FormInputs'
import TextArea from '../components/TextArea'
import useForm from '../hooks/useForm'


const initialValues = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;

}
const Contact = () => {
  const {
    values,
    errors,
    success,
    handleChange,
    handleSubmit,
  } = useForm(initialValues, validate);

  function submitForm(formData) {
    console.log(formData);
  }


  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-gray-900 font-bold text-4xl">
        Contact Us
      </h1>

      <p className="mb-8 text-gray-600">
        Have a question or suggestion? we would love to hear from you.
      </p>

      <Alert
        type="success"
        message={success}
      />

      <form 
        onSubmit={handleSubmit(submitForm)}
        className="space-y-6"
      >
        <FormInputs 
          label={'Name'}
          name={'name'}
          value={values.name}
          onChange={handleChange}
          placeholder={'Enter your name'}
          error={errors.name}
        />

        <FormInputs 
          label={'Email'}
          name={'email'}
          value={values.email}
          onChange={handleChange}
          placeholder={'Enter your email'}
          error={errors.email}
        />

        <TextArea 
          label={'Message'}
          name={'message'}
          value={values.message}
          onChange={handleChange}
          placeholder={'Write your message...'}
          error={errors.message}
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </section>
  )
}

export default Contact