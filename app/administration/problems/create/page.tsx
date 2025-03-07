import CreateProblemForm from "@/components/modules/CreateProblemModule";
import { Toaster } from "@/components/core/common/toaster";

function Form() {
  return (
    <>
      <div className="space-y-6">
        <div className="max-w-5xl">
          <CreateProblemForm />
        </div>

        <Toaster />
      </div>
    </>
  );
}

export default Form;
