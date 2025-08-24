import { Code, Zap, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Fast Performance",
      description: "Optimized for speed with Next.js and React Query for smooth data fetching.",
      icon: <Zap className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Developer Friendly",
      description: "Built with modern tools like Tailwind CSS, TypeScript, and Shadcn UI.",
      icon: <Code className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Secure by Default",
      description: "Authentication, authorization, and database connections follow best practices.",
      icon: <Shield className="h-8 w-8 text-purple-500" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
          Features
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
