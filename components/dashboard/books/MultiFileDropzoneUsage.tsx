'use client';

import {
    MultiFileDropzone,
    type FileState,
} from './MultiFileDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState, useEffect } from 'react';

interface MultiFileDropzoneUsageProps {
    name: string;
    value: string | null; // Expecting a URL instead of File[]
    onChange: (fileUrl: string | null) => void; // Store only the URL
}

export default function MultiFileDropzoneUsage({ name, value, onChange }: MultiFileDropzoneUsageProps) {
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    useEffect(() => {
        if (value) {
            setFileStates([
                {
                    file: new File([], value), // Simulate a File object with only name
                    key: value,
                    progress: 'COMPLETE',
                },
            ]);
        }
    }, [value]);

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((prev) =>
            prev.map((fileState) =>
                fileState.key === key ? { ...fileState, progress } : fileState
            )
        );
    }

    return (
        <div>
            <MultiFileDropzone
                value={fileStates}
                onChange={() => { }} // No need to update local state manually
                onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);

                    await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                            try {
                                const res = await edgestore.publicFiles.upload({
                                    file: addedFileState.file,
                                    onProgressChange: async (progress) => {
                                        updateFileProgress(addedFileState.key, progress);
                                        if (progress === 100) {
                                            await new Promise((resolve) => setTimeout(resolve, 1000));
                                            updateFileProgress(addedFileState.key, 'COMPLETE');
                                        }
                                    },
                                });

                                console.log("Uploaded File URL:", res.url);
                                onChange(res.url); // Save the file URL
                            } catch (err) {
                                updateFileProgress(addedFileState.key, 'ERROR');
                            }
                        }),
                    );
                }}
            />
        </div>
    );
}
