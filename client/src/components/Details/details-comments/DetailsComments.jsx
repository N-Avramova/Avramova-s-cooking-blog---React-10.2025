import { useEffect, useState } from "react";
import { formattedDate } from "../../../utils/DateConvertion";
import useRequest from "../../../hooks/useRequest";

export default function DetailsComments({
    recipeId,
    refresh
}) {

    const [comments, setComments] = useState([]);
   
     const { requestData } = useRequest();

     useEffect(() => {
     
        const getComments = async () => {
            const commentsValue = await requestData(`data/comments?where=recipeId%3D"${recipeId}"&load=author%3D_ownerId%3Ausers`);
            setComments(commentsValue);
        }

        getComments();
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
                                    <h4 className="font-semibold text-gray-800">{comment.author.fullName}</h4>
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