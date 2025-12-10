import { useEffect, useState } from "react";
import useRequest from '../../hooks/useRequest';

export default function AdminComments() {
  const [commentsData, setCommentsData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { requestData } = useRequest();

  useEffect(() => {
    const fetchComments = async () => {
      const url = `data/comments?where=isApproved%3Dfalse&load=author%3D_ownerId%3Ausers`;
      const recipesData = await requestData("data/recipes");
      const resultComments = await requestData(url);

      const data = resultComments.map(comment => (
        {
          ...comment,
          recipeData: recipesData.find((recipe) => recipe._id === comment.recipeId),
        }));
      setCommentsData(data);
    };
    fetchComments();
  }, [refresh]);

  const approveCommentHandler = async (commentId) => {
    const isConfirmed = confirm(`Are you sure you want to approve comment?`);

    if (!isConfirmed) {
      return;
    }

    const currentComment = commentsData.find((c) => c._id === commentId);
    currentComment.isApproved = true;

    const approvedUrl = `data/comments/${commentId}`;
    const result = await requestData(approvedUrl, "PUT", currentComment);
    if (result) {
      setRefresh((state) => !state);
    }
  };

  const rejectCommentHandler = async (commentId) => {
    const isConfirmed = confirm(`Are you sure you want to reject comment?`);

    if (!isConfirmed) {
      return;
    }

    const rejectUrl = `data/comments/${commentId}`;
    const result = await requestData(rejectUrl, 'DELETE');
    if (result) {
      setRefresh((state) => !state);
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
                Recipe Name
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
              <tr key={c._id}>
                <td className="px-6 py-4 text-gray-800">{c.text}</td>
                <td className="px-6 py-4 text-gray-800">{c.recipeData.title}</td>
                <td className="px-6 py-4 text-gray-500">{c.author.fullName}</td>
                <td className="px-6 py-4 text-gray-500">{c.author.email}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  <button onClick={() => approveCommentHandler(c._id)} className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                    Approve
                  </button>
                  <button onClick={() => rejectCommentHandler(c._id)} className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition">
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
