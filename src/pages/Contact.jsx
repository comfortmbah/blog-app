

const Contact = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-gray-900 font-bold text-4xl">
        Contact Us
      </h1>

      <p className="mb-8 text-gray-600">
        Have a question or suggestion? we would love to hear from you.
      </p>

      <form 
        className="space-y-6"
      >
        <div>
          <label 
            htmlFor="name"
            className="mb-2 block font-medium text-gray-700"
          >
            Name
          </label>

          <input 
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600
              focus:outline-none"
          />
        </div>

        <div>
          <label 
            htmlFor="email"
            className="mb-2 block font-medium text-gray-700"
          >
            Email
          </label>

          <input 
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600
              focus:outline-none"
          />
        </div>

        <div>
          <label 
            htmlFor="message"
            className="mb-2 block font-medium text-gray-700"
          >
            Message
          </label>

          <textarea 
            id="message"
            name="message"
            rows={'6'}
            placeholder="Write your message..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600
              focus:outline-none"
          />
        </div>

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