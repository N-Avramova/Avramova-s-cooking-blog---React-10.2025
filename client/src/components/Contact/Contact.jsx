export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-center text-gray-600 mb-12">
        Have a question about a recipe, want to collaborate, or just want to say hello?  
        Fill out the form below — we'd love to hear from you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="bg-white shadow-md rounded-lg p-6 space-y-5">

          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block font-medium mb-1">Subject</label>
            <input
              type="text"
              placeholder="Recipe Request, Feedback, Collaboration..."
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              placeholder="Write your message here..."
              rows={6}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-between bg-gray-50 rounded-lg p-6 shadow-md">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              We love hearing from our foodie community!  
              Reach out anytime — we usually respond within 24 hours.
            </p>

            <div className="space-y-3 text-gray-700">
              <p><strong>Email:</strong> contact@myrecipeblog.com</p>
              <p><strong>Instagram:</strong> @myrecipeblog</p>
              <p><strong>Facebook:</strong> Recipe Blog Official</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            <a className="text-gray-600 hover:text-green-600" href="#">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a className="text-gray-600 hover:text-green-600" href="#">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a className="text-gray-600 hover:text-green-600" href="#">
              <i className="fab fa-pinterest text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Optional Map or Banner */}
      <div className="mt-12">
        <iframe
          title="map"
          className="w-full h-64 rounded-lg shadow-md"
          src="https://maps.google.com/maps?q=Varna&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>
    </div>
  );
}
