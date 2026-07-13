import { LogoLoader } from "@/components/ui/logo-loader";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LogoLoader size={80} />
    </div>
  );
}

