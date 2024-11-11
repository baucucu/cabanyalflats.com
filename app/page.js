import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import PropertiesSection from "@/components/PropertiesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-4">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <Image
                src="/valencia_icon.png"
                alt="Logo"
                width={30}
                height={30}
              />
              <span className="hidden font-bold sm:inline-block">
                Cabanyal Flats
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="#features"
              >
                Features
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="#apartments"
              >
                Properties
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="#contact"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center"
          style={{
            backgroundImage: `url('/Cabanyal-1.jpg')`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content */}
          <div className="relative container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Valencia
                </h1>
                <p className="text-2xl font-semibold">Cabanyal Flats</p>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Comfortable and affordable apartments for Erasmus students in
                  the heart of Valencia.
                </p>
              </div>
              <div className="space-x-4">
                <Button>View Apartments</Button>
                <Button variant="secondary">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Prime Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    All our apartments are located in the city center, close to
                    universities and amenities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Fully Furnished</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our apartments come fully equipped with everything you need
                    for a comfortable stay.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Student Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Join a vibrant community of international students from all
                    over the world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <PropertiesSection />

        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Contact Us
            </h2>
            <form className="max-w-md mx-auto space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-800 text-gray-400">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-bold mb-2">Valencia Student Apartments</h3>
              <p>
                Providing comfortable homes for Erasmus students since 2010.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <a href="#features">Features</a>
                <a href="#apartments">Accommodation</a>
                <a href="#contact">Contact</a>
              </nav>
            </div>
            <div>
              <h3 className="font-bold mb-2">Contact Info</h3>
              <p>Email: info@cabanyalflats.com</p>
              <p>Phone: +34 123 456 789</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p>&copy; 2024 Cabanyal Flats. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
