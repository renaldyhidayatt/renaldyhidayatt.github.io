import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import profileImage from "@/assets/profile.jpg"; 
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-16">
          <div className="md:grid md:grid-cols-[auto_1fr] md:gap-8 items-center">
            <img
              src="https://avatars.githubusercontent.com/u/46998157?v=4"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-amber-500 dark:border-blue-300"
            />
            <div className="mt-6 md:mt-0">
              <h1 className="text-3xl font-serif font-light text-amber-500 dark:text-blue-200 mb-2">
                About Me
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-light mb-4">
                Software engineer, backend enthusiast, lifelong learner.
              </p>
              <Link
                to="https://drive.google.com/file/d/13194bX8sWZFmEZlo0HJZxxPKO51pEcMX/preview"
                target="_blank"
                className="inline-block px-4 py-2 text-sm rounded bg-amber-600 text-white dark:bg-blue-500 hover:bg-amber-700 dark:hover:bg-blue-600 transition"
              >
                View CV
              </Link>
            </div>
          </div>
        </header>

        <section className="space-y-12">
          <div>
            <h2 className="text-xl font-serif text-amber-500 dark:text-blue-200 mb-4">Background</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Hi! My name is Renaldy Hidayat. I'm a software engineer with a strong passion for backend development and building reliable, scalable systems.
              </p>
              <p>
                I enjoy turning ideas into real-world solutions through clean architecture, modular design, and efficient communication between systems.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-serif text-amber-500 dark:text-blue-200 mb-4">Interests</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                My main interests revolve around backend systems, distributed architecture, and cloud-native development. I'm passionate about:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400">
                <li>Backend development and system design</li>
                <li>Microservices and API design</li>
                <li>Event-driven systems using Kafka or RabbitMQ</li>
                <li>Cloud infrastructure and observability</li>
                <li>Building real tools from ideas and experiments</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-serif text-amber-500 dark:text-blue-200 mb-4">Tech Stack</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I'm comfortable working with several programming languages and tools. My main stack includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-500 dark:text-gray-400">
                <li>Golang, Python, Rust, Java, PHP, JavaScript/TypeScript</li>
                <li>gRPC, REST, GraphQL APIs</li>
                <li>Kafka, RabbitMQ, Redis</li>
                <li>SQL (PostgreSQL, MySQL), NoSQL (MongoDB)</li>
                <li>Docker, Kubernetes, Prometheus, OpenTelemetry</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-serif text-amber-500 dark:text-blue-200 mb-4">Current Focus</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I'm currently focused on refining my backend architecture skills, integrating observability tooling, and exploring performance tuning for high-load services.
              </p>
              <p>
                On the side, I enjoy experimenting with new tech stacks and turning ideas into useful developer tools, internal dashboards, or CLI utilities.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-serif text-amber-500 dark:text-blue-200 mb-4">Philosophy</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I believe in continuously learning and building. I often treat personal curiosity as a serious project and push myself to grow by doing—whether it's reading papers, trying a new language, or solving real problems.
              </p>
              <p>
                For me, sharing knowledge is part of the process. I aim to contribute by building, writing, or simply sharing what I learn along the way.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
