"use client";
import { useState } from "react";
import { Button } from "@/components/core/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/core/common/card";
import { Input } from "@/components/core/common/input";
import { Label } from "@/components/core/common/label";
import { AlertCircle, FileSpreadsheet, Upload } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/core/common/alert";
import { Progress } from "@/components/core/common/progress";
import { useImportStudentsMutation } from "@/store/queries/classroom";
import { toast } from "sonner";
import { useGetStudentProgressQuery } from "@/store/queries/instructor-classroom";
import Link from "next/link";
interface StudentImportFormProps {
  classroomId: string;
}

const StudentImportForm = ({ classroomId }: StudentImportFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { refetch } = useGetStudentProgressQuery(classroomId);

  // Hook RTK Query
  const [importStudents, { isLoading, error: importError }] =
    useImportStudentsMutation();

  // Xử lý file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  // Gửi file lên server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    console.log("Uploading file:", file.name);

    const formData = new FormData();
    formData.append("studentsFile", file); // Kiểm tra key này trùng với backend chưa?

    try {
      const response = await importStudents({ classroomId, formData }).unwrap();
      console.log("API response:", response);
      toast.success("Students imported successfully!");
      refetch();
    } catch (err) {
      console.error("Error importing students:", err);
      toast.error("Failed to import students.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Students</CardTitle>
        <CardDescription>Upload an Excel file (.xlsx, .xls)</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label>Excel File</Label>
          <Input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />

          {isLoading && <Progress value={uploadProgress} className="h-2" />}

          {importError && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to upload</AlertDescription>
            </Alert>
          )}

          {/* Container để căn chỉnh Submit và Download Sample File */}
          <div className="flex justify-end space-x-2">
            <Link href="/files/import-students-class.xlsx" download>
              <Button variant="secondary">
                <FileSpreadsheet></FileSpreadsheet> Download Sample File
              </Button>
            </Link>
            <Button type="submit" disabled={!file || isLoading}>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentImportForm;
