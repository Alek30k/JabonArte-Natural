import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[calc(100-250px)] mt-40 flex items-center justify-center">
      <SignIn />
    </div>
  );
}
