import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

export default async function AboutPage() {
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
            <AvatarImage src="https://avatars.githubusercontent.com/u/46998157?v=4" alt={siteConfig.author} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center text-foreground">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center">
            Software Developer
          </p>
        </div>
        <p className="text-muted-foreground text-lg py-4">
        I&apos;m a Computer Science candidate at Nusa Mandiri University, and
          I&apos;m deeply passionate about programming. My journey in the world
          of technology has been an exciting adventure, driven by the endless
          opportunities for learning. Whether it&apos;s exploring cutting-edge
          programming languages, leveraging groundbreaking frameworks, or
          applying technology in innovative ways, I&apos;m always up for the
          challenge. Staying updated with the latest developments is a priority,
          as I strive to incorporate them into my work.

          <br /> <br />
          My dedication to turning hobbies into meaningful projects is a source
          of fulfillment. It allows me to merge creativity with technical
          expertise. Crafting web applications and developing software solutions
          are areas where I find immense satisfaction, bringing ideas to life
          through code. Above all, my commitment to continuous improvement
          drives my journey. I firmly believe that success in the tech world is
          rooted in lifelong learning. Every day is an opportunity to expand my
          knowledge, refine my skills, and embrace new challenges head-on. This
          unwavering dedication keeps me pushing the boundaries.
        </p>
      </div>
    </div>
  );
}

