import { useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

type FileInputProps = {
    id: string;
    accept: string;
    required?: boolean;
    onChange?: (file: File | null) => void;
};

export default function FileInput({ id, accept, onChange }: FileInputProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (onChange) {
            onChange(file);
        }
    };

    return (
        <div>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor={id}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                            <span>{selectedFile ? selectedFile.name : "Upload a file"}</span>
                            <input
                                id={id}
                                type="file"
                                accept={accept}
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <p className="text-xs text-gray-500">
                        {accept === "image/*" ? "PNG, JPG, GIF up to 10MB" : "PDF up to 10MB"}
                    </p>
                </div>
            </div>
        </div>
    );
}
