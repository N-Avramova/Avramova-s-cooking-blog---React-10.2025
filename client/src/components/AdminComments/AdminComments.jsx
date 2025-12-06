import { useEffect, useState } from "react";
import { fetchNotApprovedComments } from "../../services/commentsService";
import { fetchUsersByUserIds } from "../../services/usersServices";

export default function AdminComments() {
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await fetchNotApprovedComments();
      const commentsOwnersData = await fetchUsersByUserIds(comments.map(c => c._ownerId));
      const resultComments = comments.map(comment => {
        const owner = commentsOwnersData.find(owner => owner.id === comment.ownerId);
        return {
          ...comment,
          commentOwnerFullName: [owner?.firstName, owner?.lastName].filter(Boolean).join(' ') || '',
          email: owner?.email || ''
        };
      });

      setCommentsData(resultComments);
    };
    fetchComments();
  }, []);

  const approveCommentHandler = async () => {
    const isConfirmed = confirm(`Are you sure you want to approve comment?`);

    if (!isConfirmed) {
      return;
    }
  };

  const rejectCommentHandler = async () => {
    const isConfirmed = confirm(`Are you sure you want to reject comment?`);

    if (!isConfirmed) {
      return;
    } 
  };

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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {commentsData.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-gray-800">{c.text}</td>
                <td className="px-6 py-4 text-gray-500">{c.commentOwnerFullName}</td>
                <td className="px-6 py-4 text-gray-500">{c.email}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  <button onClick={approveCommentHandler} className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                    Approve
                  </button>
                  <button onClick={rejectCommentHandler} className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition">
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
