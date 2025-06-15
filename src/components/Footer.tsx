import { Mail, Github, Linkedin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-3 flex justify-center space-x-4">
          <a target="_blank" rel="noreferrer" href="mailto:easa@gmail.com">
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6 hover:text-blue-600 transition-colors" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://github.com/your-username">
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6 hover:text-gray-900 transition-colors" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://linkedin.com/in/your-username">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6 hover:text-blue-700 transition-colors" />
          </a>
          <a target="_blank" rel="noreferrer" href="https://t.me/your-username">
            <span className="sr-only">Telegram</span>
            <Send className="h-6 w-6 hover:text-sky-500 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
