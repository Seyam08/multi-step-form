import MultiStepForm from "@/components/Form/MultiStepForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-center p-6 md:p-10">
      <h2 className="basis-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-wide first:mt-0">
        M360 Talent hunt
      </h2>
      <div className="w-full flex items-center justify-center p-2 md:p-8">
        <MultiStepForm />
      </div>
    </div>
  );
}
