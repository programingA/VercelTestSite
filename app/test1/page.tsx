export default function domain() {
  return (
    <div className="bg-green-200 h-screen w-screen border-2 border-red-200">
        <h1 className="text-3xl font-bold underline m-4">Test1</h1>
        <span className="text-lg text-gray-500 p-4">This is the test1 page.</span>
        <ul>
          <li>
            <a href="/dashboard" className="text-blue-500 hover:underline p-4">Go to DashBoard</a>
          </li>
          <li>
            <a href="/" className="text-blue-500 hover:underline p-4">Go to Home</a>
          </li>
        </ul>
    </div>
    );
}