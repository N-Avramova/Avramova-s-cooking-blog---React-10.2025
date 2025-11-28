import { useState } from "react";
import { fetchUserByEmail } from "../../../services/usersServices";
import { createComment } from "../../../services/commentsService";
import { useParams } from "react-router";

export default function CreateComments(
     {
        onCreate
     }
) {
    const initialValues = {
        name: '',
        email: '',
        comment: '',
    };

    const recipe = useParams();
    const [values, setValues] = useState(initialValues);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [userId, setUserId] = useState(null);

    const changeDataHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async () => {
        const userIdValue = await fetchUserByEmail(values.email);
        setUserId(userIdValue);

        const dataComment = {
            _ownerId: userIdValue,
            text: values.comment,
            recipeId: recipe.recipeId,
            isApproved: !!userIdValue,
            date: new Date().toISOString(),
        };

        const result = await createComment(dataComment);
        if (result._id && !userId) {
            setShowSuccessMessage(true);
        }
        setValues(initialValues);
        onCreate();
    }
    return (
        <>
            <h2 class="text-2xl font-semibold mb-4">Add a Comment</h2>
            <form class="space-y-4" action={submitHandler}>
                <div>
                    <label class="block text-gray-700">Name</label>
                    <input
                        type="text"
                        class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Your name"
                        name="name"
                        onBlur={changeDataHandler}
                    />
                </div>
                <div>
                    <label class="block text-gray-700">Email</label>
                    <input
                        type="text"
                        class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Your email"
                        name="email"
                        onBlur={changeDataHandler}
                    />
                </div>
                <div>
                    <label class="block text-gray-700">Comment</label>
                    <textarea
                        class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        rows="4"
                        placeholder="Write your comment..."
                        name="comment"
                        onBlur={changeDataHandler}
                    ></textarea>
                </div>
                <p class="text-green-500">
                    {showSuccessMessage && (
                        !userId ?
                            "Comment submitted for review! Thank you for your opinion."
                            : "Your comment is submitted successfully."
                    )
                    }
                </p>
                <button
                    type="submit"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Post Comment
                </button>
            </form>
        </>
    )
}   