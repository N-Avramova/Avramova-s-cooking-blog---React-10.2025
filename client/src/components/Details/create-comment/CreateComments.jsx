import { useState } from "react";
import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest"
import useForm from "../../../hooks/useForm";

export default function CreateComments() {
    const recipe = useParams();
    const { requestData } = useRequest();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const createCommentHandler = async (values) => {       
        const dataComment = {
            ...values,
            recipeId: recipe.recipeId,
            isApproved: false, 
            date: new Date().toISOString(),
        };
        try {
            const result = await requestData('data/comments', 'POST', dataComment);
            if(result) {
                setShowSuccessMessage(true);
            }
        } catch (err) {
            alert(err.message)
        }
    }

    const {
        registerValueData,
        formActionHandler,
    } = useForm(createCommentHandler, {
        name: '',
        email: '',
        text: '',
    });
    
    return (
        <>
            <h2 class="text-2xl font-semibold mb-4">Add a Comment</h2>
            <form class="space-y-4" action={formActionHandler}>
                <div>
                    <label class="block text-gray-700">Name</label>
                    <input
                        type="text"
                        class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Your name"
                        {...registerValueData("name")}
                    />
                </div>
                <div>
                    <label class="block text-gray-700">Email</label>
                    <input
                        type="text"
                        class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="Your email"
                        {...registerValueData("email")}
                    />
                </div>
                <div>
                    <label class="block text-gray-700">Comment</label>
                    <textarea
                        class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        rows="4"
                        placeholder="Write your comment..."
                        {...registerValueData("text")}
                    ></textarea>
                </div>
                <p class="text-green-500">
                    {
                        showSuccessMessage && 
                            "Comment submitted for review! Thank you for your opinion."
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