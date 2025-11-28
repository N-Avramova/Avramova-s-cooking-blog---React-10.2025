import { useEffect, useState } from "react";
import { fetchComments } from "../../../services/commentsService";
import { fetchUsersByUserIds } from "../../../services/usersServices";
import { formattedDate } from "../../../utils/DateConvertion";

export default function DetailsComments({
    recipeId,
    refresh
}) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchAllComments = async () => {
            const allCommentsValue = await fetchComments();
            const filteredComments = allCommentsValue.filter(
                comment => comment.recipeId === recipeId && comment.isApproved
            );
            const commentsOwnersData = await fetchUsersByUserIds(filteredComments.map(c => c._ownerId));
            const resultComments = filteredComments.map(comment => {
                const owner = commentsOwnersData.find(owner => owner.id === comment.ownerId);
                return {
                    ...comment,
                    commentOwnerFullName: [owner?.firstName, owner?.lastName].filter(Boolean).join(' ') || ''
                };
            });
            console.log(resultComments);
            setComments(resultComments);
        };
        fetchAllComments();
    }, [recipeId, refresh]);

    return (
        <>
            {/* <!-- Comment Section --> */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                {/* <!-- Comment List --> */}
                <div className="space-y-6">
                    {comments.map((comment) => {
                       
                        return (
                            <div className="flex gap-3" key={comment._id}>
                                <div>
                                    <h4 className="font-semibold text-gray-800">{comment.commentOwnerFullName}</h4>
                                    <p className="text-gray-700">{comment.text}</p>
                                    <span className="text-gray-400 text-sm">{formattedDate(comment.date)}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}