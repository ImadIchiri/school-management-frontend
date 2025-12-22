// src/pages/Login.tsx
export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "rgb(182, 220, 126)" }} // Vert clair
    >
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left side: Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/mnt/data/ef1bea82-cf36-4ad5-bda0-3bff7beb2ab2.png"
            alt="Login Image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side: Form */}
        <div className="w-full md:w-1/2 bg-white p-10">
          {/* Label-style "button" */}
          <div className="flex justify-end mb-6">
            <span
              className="px-4 py-2 rounded-full font-semibold"
              style={{
                backgroundColor: "rgb(145, 200, 120)",
                color: "rgb(80, 150, 90)",
              }} // Vert moyen clair & Vert foncé
            >
              Login
            </span>
          </div>

          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: "rgb(80, 150, 90)" }}
          >
            Welcome
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgb(80, 150, 90)" }}>
            Please login to your account
          </p>

          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username or Email"
                className="w-full border-b py-2 focus:outline-none"
                style={{ borderColor: "rgb(80, 150, 90)" }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border-b py-2 focus:outline-none"
                style={{ borderColor: "rgb(80, 150, 90)" }}
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <a
                href="#"
                style={{ color: "rgb(145, 200, 120)" }} // Vert moyen clair
                className="hover:underline"
              >
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full font-semibold mt-4"
              style={{
                backgroundColor: "rgb(145, 200, 120)",
                color: "rgb(80, 150, 90)",
              }}
            >
              OK
            </button>
          </form>

          <p
            className="text-center text-xs mt-4"
            style={{ color: "rgb(80, 150, 90)" }}
          >
            Terms and Conditions & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
