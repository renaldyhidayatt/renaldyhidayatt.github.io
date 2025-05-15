import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import ModalCV from "@/components/model_cv";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

export default function AboutPage() {


  return (
    <div className="container max-w-6xl py-6 lg:py-10 bg-background text-foreground">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About Me
          </h1>
        </div>
      </div>
      <hr className="my-8 border-border" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/46998157?v=4"
              alt={siteConfig.author}
            />
            <AvatarFallback>RH</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center text-foreground">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center">Software Engineer</p>
          <ModalCV />
        </div>
        <p className="text-muted-foreground text-lg py-4">
          I&apos;m a <strong>Software Engineer</strong> with a deep passion for backend development and building reliable, scalable systems. I enjoy working with modern programming languages and technologies to create clean, maintainable, and high-performing applications.

          <br /> <br />
          Skilled in <strong>Golang, Python, Java, Rust, PHP, JavaScript, and TypeScript</strong>, I focus on developing APIs, designing microservices architectures, and integrating robust messaging systems like <strong>Kafka</strong> and <strong>RabbitMQ</strong>. My enthusiasm for programming drives me to turn hobbies into impactful, real-world projects—combining creativity with strong technical execution. I stay actively engaged with the latest tech trends, continuously refining my skills and applying them across a wide range of use cases—from payment systems to recommendation engines and developer tools.
        </p>
      </div>

    </div>
  );
}
