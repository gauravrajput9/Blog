export default function Loading() {
  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="animate-pulse flex flex-col items-center text-center space-y-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full" />
        <div className="h-6 w-40 bg-gray-300 rounded" />
        <div className="h-4 w-56 bg-gray-200 rounded" />
        <div className="h-5 w-20 bg-gray-200 rounded" />
        <div className="h-16 w-full bg-gray-200 rounded" />
      </div>
    </div>
  )
}
