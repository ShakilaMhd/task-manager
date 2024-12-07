import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link"

const SignUpCard = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">ثبت نام کنید</CardTitle>
        <CardDescription>
          By signing up you agree to our{" "}
          <Link href="/privacy">
            <span className="text-blue-700">privacy policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-blue-700">Term of service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7 ">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form action="" className="space-y-4">
        <Input
            required
            type="text"
            value={""}
            onChange={() => {}}
            placeholder="لطفا اسم خود را وارد نمایید"
            disabled={false}
          />
          <Input
            required
            type="email"
            value={""}
            onChange={() => {}}
            placeholder="لطفا ایمیل خود را وارد نمایید"
            disabled={false}
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="لطفا رمز خود را وارد نمایید"
            disabled={false}
            min={8}
            max={256}
          />
          <Button disabled={false} size={"lg"} className="w-full">
            ثبت نام
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant="secondary"
          size={"lg"}
          className="w-full"
        >
          Login with Google
          <FcGoogle className="mr-2 size-5" />
        </Button>
        <Button
          disabled={false}
          variant="secondary"
          size={"lg"}
          className="w-full"
        >
          Login with Github
          <FaGithub className="mr-2 size-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
