export default function AdminComments() {
  const comments = [
    { id: 1, text: "This is a great post!", owner: "Alice" },
    { id: 2, text: "Needs more details.", owner: "Bob" },
    { id: 3, text: "I agree with the points made.", owner: "Charlie" },
  ];

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Owner
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {comments.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-gray-800">{c.text}</td>
                <td className="px-6 py-4 text-gray-500">{c.owner}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                    Approve
                  </button>
                  <button className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
