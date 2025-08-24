import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* Logo & Description */}
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              MyApp
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Building modern web applications with performance, style, and
              great developer experience.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                className="hover:text-blue-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@myapp.com"
                className="hover:text-red-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-blue-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="hover:text-blue-500 transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-blue-500 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
