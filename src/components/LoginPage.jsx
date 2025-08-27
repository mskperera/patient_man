import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import LogoForLogin from '../assets/logo.png';
import loginBack from '../assets/loginback.png';
import { userLogin } from '../functions/patient';
import { parseJwt } from '../utils/jwt';

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {


      const payload={loginUsername:credentials.username,password:credentials.password}
 const authRes = await userLogin(payload);

       const accessToken = authRes.data.accessToken;
    localStorage.setItem('token', accessToken);

       const plaindata = parseJwt(accessToken);

    localStorage.setItem('userId', plaindata.userId);
    localStorage.setItem('user', JSON.stringify(plaindata));

    console.log('authRes:',authRes)
    if(authRes.data.exception){
      setErrors({ form: authRes.data.exception.message });
    }
      // Simulated API call (replace with actual authentication logic)
     // await new Promise((resolve) => setTimeout(resolve, 1000));
      // On success, navigate to patient type selection
      navigate('/home');
    } catch (error) {
      setErrors({ form: 'Invalid username or password' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '', form: '' }));
  };

  return (
   <div
   className="min-h-screen flex items-center justify-around py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
  style={{ backgroundImage: `url(${loginBack})` }} 
>

<div></div>
      
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-xl">
        {/* Avatar Image */}
        <div className="flex justify-center mb-6">
          <img
            src={LogoForLogin}
            alt="login logo"
            className="h-16"
          />
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Log in to manage patient records
          </p>
        </div>

        {/* Form */}
        <div>
          {errors.form && (
            <p className="text-center text-sm text-red-600 mb-4">{errors.form}</p>
          )}
          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-md font-medium text-gray-600"
              >
                Username
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="text-sky-600" size={16} />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 text-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter your username"
                  aria-label="Username"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-600"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="text-sky-600" size={16} />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 text-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
                  placeholder="Enter your password"
                  aria-label="Password"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-md text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex justify-center items-center bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                aria-label="Log in to your account"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Log In'
                )}
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
            <a
              href="/forgot-password"
              className="text-sm text-sky-600 hover:text-sky-700 hover:underline transition-colors duration-200"
              aria-label="Forgot your password?"
            >
              Forgot your password?
            </a>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="/register"
                className="text-sky-600 hover:text-sky-700 hover:underline transition-colors duration-200"
                aria-label="Register for a new account"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;