import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" pt-48  flex items-center justify-center">
      <SignUp />
    </div>
  );
}
