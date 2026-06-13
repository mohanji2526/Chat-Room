import React from 'react';

// Reusable Project Component
const ProjectCard = ({ title, description, techStack }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col h-full">
    <h4 className="text-xl font-bold mb-3 text-gray-800">{title}</h4>
    <p className="text-gray-600 mb-6 flex-grow">{description}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {techStack.map((tech, index) => (
        <span key={index} className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const DevelopSolutionPage = () => {

  const scrollToSection = (e, sectionId) => {
    e.preventDefault(); // Stops the router from getting confused by the '#'
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans scroll-smooth">
      
      {/* --- HEADER --- */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Develop Solution</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-gray-600 font-medium">
              <li>
                <button onClick={(e) => scrollToSection(e, 'services')} className="hover:text-blue-600 transition cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={(e) => scrollToSection(e, 'about')} className="hover:text-blue-600 transition cursor-pointer">
                  About
                </button>
              </li>
              <li>
                <button onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-blue-600 transition cursor-pointer">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-blue-600 transition cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Empowering Your Digital Vision</h2>
          <p className="text-xl mb-8 text-blue-100">Delivering robust, scalable web solutions for modern businesses.</p>
          <button 
            onClick={(e) => scrollToSection(e, 'contact')} 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-800 relative inline-block">
            Our Services
            <span className="block w-12 h-1 bg-blue-600 mx-auto mt-4 rounded"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">🌐</div>
              <h4 className="text-xl font-bold mb-3">Web Development</h4>
              <p className="text-gray-600 leading-relaxed">
                Custom, highly scalable, and responsive web applications built with modern frameworks to deliver seamless user experiences.
              </p>
            </div>

            <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-bold mb-3">AI Integration</h4>
              <p className="text-gray-600 leading-relaxed">
                Enhancing digital products by integrating cutting-edge Generative AI and Agentic AI workflows directly into your applications.
              </p>
            </div>

            <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">⚙️</div>
              <h4 className="text-xl font-bold mb-3">Full-Stack Architecture</h4>
              <p className="text-gray-600 leading-relaxed">
                End-to-end development, from building robust backend systems in Python to crafting intuitive frontend interfaces with React.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-800 relative inline-block">
            About Me
            <span className="block w-12 h-1 bg-blue-600 mx-auto mt-4 rounded"></span>
          </h3>
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-left">
            <div className="w-32 h-32 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold shrink-0">
              MG
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-1">Mohan Gupta</h4>
              <p className="text-blue-600 font-semibold mb-4 text-lg">Senior Software Engineer & Full Stack Developer</p>
              <p className="text-gray-600 leading-relaxed mb-4">
                With a B.Tech in Computer Science and Engineering from Ajay Kumar Garg Engineering College, I specialize in architecting and building highly scalable digital products. My core expertise lies in full-stack integration utilizing Python and React to create seamless, end-to-end solutions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Beyond traditional web development, I have a deep, sustained focus on Agentic AI and Generative AI frameworks. Whether it's designing complex backend architecture, real-time data processing, or deploying intelligent autonomous agents, I am passionate about leveraging cutting-edge technology to solve complex problems and build impactful software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-800 relative inline-block">
            Featured Projects
            <span className="block w-12 h-1 bg-blue-600 mx-auto mt-4 rounded"></span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            
            {/* Example Project 1 */}
            <ProjectCard 
              title="Real-Time Transcription & Translation Engine" 
              description="Developed a highly scalable, real-time audio processing pipeline capable of live transcription and translation for enterprise streaming data."
              techStack={['Azure Speech Service', 'Event Hubs', 'Python', 'React']}
            />

            {/* Empty Slot 1: Drop your custom component here */}
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col h-full">
              <div className="center flex flex-col items-center justify-center  ">
              <a href="/#chat" className="text-3xl mb-2 hover:text-blue-600 transition cursor-pointer">chat live project</a>
              </div>
              <p className="text-gray-600 mb-6 flex-grow">Click the link above to access the live chat project component.</p>
            </div>

            {/* Empty Slot 2: Drop your custom component here */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center text-gray-400 min-h-[250px] hover:bg-gray-100 transition cursor-pointer">
              <span className="text-3xl mb-2">+</span>
              <p className="font-medium">Add Project Component Here</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 relative inline-block">
            Contact Us
            <span className="block w-12 h-1 bg-blue-500 mx-auto mt-4 rounded"></span>
          </h3>
          <form className="space-y-6 text-left bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 transition" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 transition" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                placeholder="How can we help you?" 
                rows="5" 
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 transition resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-gray-500 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Develop Solution. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default DevelopSolutionPage;