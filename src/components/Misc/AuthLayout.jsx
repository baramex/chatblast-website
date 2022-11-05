import BgAuth from "../Images/BgAuth";

export function AuthLayout({ children }) {
  return (
    <>
      <div className="relative flex min-h-full justify-center md:px-12 lg:px-0 h-[100vh]">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1 bg-emerald-500 overflow-hidden">
          <BgAuth
            className="absolute min-w-full min-h-full inset-0"
          />
        </div>
      </div>
    </>
  )
}
