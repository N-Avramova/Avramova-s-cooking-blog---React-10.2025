import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Register() {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const [values, setValues] = useState(initialValues);
    const navigate = useNavigate();
    const { registerHandler } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const registerSubmitHandler = () => {
        if (values.password !== values.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        registerHandler(values.email, values.password);
        navigate("/");
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

            <form className="space-y-5" action={registerSubmitHandler}>

                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={values.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="********"
                        value={values.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block mb-1 font-medium">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="********"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-green-300"
                        required
                    />
                </div>
                {/* Submit */}
                <button
                    type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Register
                </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 underline">
                    Login
                </Link>
            </p>
        </div>
    );
}
