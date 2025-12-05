import { useNavigate } from 'react-router';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function Login() {

    const navigate = useNavigate();
    
    const { loginHandler } = useContext(UserContext);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return alert('Email and password are required!');
        }

        try {
            loginHandler(email, password);
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <>
            <div className="min-h-110 flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-sm bg-white shadow-xl rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Login to Your Account
                    </h2>
                    <form class="space-y-5" onSubmit={submitHandler}>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="you@example.com" required
                                name='email'
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="••••••••" required
                                name='password'
                            />
                        </div>
                        <button
                            type="submit"
                            class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}