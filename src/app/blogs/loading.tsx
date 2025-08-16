export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Latest Blogs
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </div>
  );
}
