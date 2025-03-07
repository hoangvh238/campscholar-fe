import { GenAccountsForm } from "./GenAccountsForm";
import { InstructionsModal } from "./InstructionsModal";

export function GenAccountsModule() {
  return (
    <div className="rounded-md bg-white p-6 shadow-md dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Generate Accounts
        </h1>
        <InstructionsModal />
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Upload an Excel file following the instructions to generate new users.
      </p>
      <GenAccountsForm />
    </div>
  );
}
