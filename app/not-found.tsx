import Link from "next/link";

import { buttonVariants } from "@/components/core/common/button";
import { cn } from "@/utils/cn";

export default function NotFoundPage() {
  return (
    <div>
      <div className="error-bg flex min-h-screen items-center justify-center bg-background bg-cover bg-fixed bg-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 -mt-52 text-center text-gray-50">
              <div className="relative">
                <h1 className="tracking-tighter-less text-shadow relative font-sans text-9xl font-bold">
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </h1>
              </div>
              <h5 className="mt-3 font-semibold text-white">Page not found</h5>
              <p className="mb-6 mt-2 text-white">
                We&apos;re sorry, but the page you were looking for doesn&apos;t
                exist.
              </p>
              <Link
                className={cn(
                  "text-white",
                  `${buttonVariants({ variant: "link" })}`,
                )}
                href="/"
              >
                Return to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
