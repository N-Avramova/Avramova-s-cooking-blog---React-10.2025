export default function AboutMe() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>
      <p className="text-center text-gray-600 mb-12">
         Hi there! I'm Nevena, the heart and hands behind Avramova's Cooking Blog.
         Welcome to my little corner of the internet, where food, flavors, and passion collide!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> 
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>  
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
  );
}
