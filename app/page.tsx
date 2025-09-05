import MultiStepForm from "@/components/Form/MultiStepForm";
import { ModeToggle } from "@/components/ModeToggle";
import logo from "@/public/m360ICT.webp";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-center p-4 md:p-8">
      {/* Title row start*/}
      <div className="w-full flex justify-between items-center px-2 md:px-8">
        <div className="py-2">
          <Image src={logo} alt="My Logo" />
        </div>
        <div>
          <h2 className="basis-full scroll-m-20 border-b pb-2 text-xl md:text-3xl font-semibold tracking-wide first:mt-0">
            M360 Talent hunt
          </h2>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      {/* Title row end*/}
      {/* Form row */}
      <div className="w-full flex items-center justify-center p-2 md:p-8">
        <MultiStepForm />
      </div>
    </div>
  );
}
