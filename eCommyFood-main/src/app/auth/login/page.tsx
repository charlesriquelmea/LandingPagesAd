import { BackButton, FormLogin } from "./ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
        <FormLogin/>
        <BackButton/>
      </div>
    </div>
  );
}
