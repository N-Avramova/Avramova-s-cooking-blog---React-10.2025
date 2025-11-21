import { useEffect, useState } from "react";
import CreateComments from "../create-comment/CreateComments";
import { fetchComments } from "../../../services/commentsService";

export default function DetailsComments({
    recipeId
}) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchAllComments = async () => {
            const allCommentsValue = await fetchComments();
            const filteredComments = allCommentsValue.filter(
                comment => comment.recipeId === recipeId
            );
            setComments(filteredComments);
        };
        fetchAllComments();
    }, [recipeId]);

    return (
        <>
            {/* <!-- Comment Section --> */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                {/* <!-- Comment List --> */}
                <div className="space-y-6">
                    {comments.map((comment, idx) => {
                        const date = new Date(Number(comment._createdOn));
                        const formatted = isNaN(date.getTime()) ? "" : date.toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        });
                        return (
                            <div className="flex gap-3" key={comment._id ?? idx}>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Jessica</h4>
                                    <p className="text-gray-700">{comment.text}</p>
                                    <span className="text-gray-400 text-sm">{formatted}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}