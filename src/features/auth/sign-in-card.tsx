import { DottedSeparator } from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignInCard = () => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">خوش آمدید</CardTitle>
          </CardHeader>
          <div className="px-7 ">
              <DottedSeparator />
          </div>
    </Card>
  );
};

export default SignInCard;
