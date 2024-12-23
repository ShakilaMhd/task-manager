import { UserButton } from "@/features/auth/components/user-button";

const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">خانه</h1>
        <p className="text-muted-foreground">تمامی پروژه ها و تسک های خود را ببینید</p>
          </div>
          <UserButton />
    </nav>
  );
};

export default Navbar;
