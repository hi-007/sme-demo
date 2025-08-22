import React, { useState } from 'react';

type FilePreviewProps = {
    fileName: string;
    fileSize: string;
    fileExtension: string;
    progress: number;
    onRemove: () => void;
};

const FilePreview: React.FC<FilePreviewProps> = ({ fileName, fileSize, fileExtension, progress, onRemove }) => {
    return (
        <div className="p-3 bg-white border border-solid border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
            <div className="mb-1 flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                    <span className="size-10 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500">
                        {/* Add icon here */}
                        <img className="rounded-lg hidden" data-dz-thumbnail="" />
                    </span>
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                            <span className="truncate inline-block max-w-75 align-bottom">{fileName}</span>
                            <span>{fileExtension}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-500">{fileSize}</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                        onClick={onRemove}
                    >
                        <svg
                            className="shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-x-3 whitespace-nowrap">
                <div
                    className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    <div
                        className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="w-10 text-end">
                    <span className="text-sm text-gray-800 dark:text-white">
                        <span>{progress}</span>%
                    </span>
                </div>
            </div>
        </div>
    );
};

const FileUpload: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(event.target.files || []);
        newFiles.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.onloadstart = () => {
                setFiles((prevFiles) => [
                    ...prevFiles,
                    {
                        name: file.name,
                        size: file.size,
                        extension: file.name.split('.').pop(),
                        progress: 0,
                    },
                ]);
            };

            fileReader.onloadend = () => {
                setFiles((prevFiles) =>
                    prevFiles.map((item) =>
                        item.name === file.name ? { ...item, progress: 100 } : item
                    )
                );
            };

            fileReader.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    setFiles((prevFiles) =>
                        prevFiles.map((item) =>
                            item.name === file.name ? { ...item, progress: percent } : item
                        )
                    );
                }
            };

            fileReader.readAsDataURL(file);
        });
    };

    const handleRemoveFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    return (
        <div>
            <div className="cursor-pointer p-12 flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
                <div className="text-center">
                    <span className="inline-flex justify-center items-center size-16">
                        <svg
                            className="shrink-0 w-16 h-auto"
                            width="71"
                            height="51"
                            viewBox="0 0 71 51"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.55172 8.74547L17.7131 6.88524V40.7377L12.8018 41.7717C9.51306 42.464 6.29705 40.3203 5.67081 37.0184L1.64319 15.7818C1.01599 12.4748 3.23148 9.29884 6.55172 8.74547Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="stroke-blue-600 dark:stroke-blue-500"
                            ></path>
                            <path
                                d="M64.4483 8.74547L53.2869 6.88524V40.7377L58.1982 41.7717C61.4869 42.464 64.703 40.3203 65.3292 37.0184L69.3568 15.7818C69.984 12.4748 67.7685 9.29884 64.4483 8.74547Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="stroke-blue-600 dark:stroke-blue-500"
                            ></path>
                            <g filter="url(#filter4)">
                                <rect
                                    x="17.5656"
                                    y="1"
                                    width="35.8689"
                                    height="42.7541"
                                    rx="5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="stroke-blue-600 dark:stroke-blue-500"
                                    shapeRendering="crispEdges"
                                ></rect>
                            </g>
                            <path
                                d="M39.4826 33.0893C40.2331 33.9529 41.5385 34.0028 42.3537 33.2426L42.5099 33.0796L47.7453 26.976L53.4347 33.0981V38.7544C53.4346 41.5156 51.1959 43.7542 48.4347 43.7544H22.5656C19.8043 43.7544 17.5657 41.5157 17.5656 38.7544V35.2934L29.9728 22.145L39.4826 33.0893Z"
                                className="fill-blue-50 stroke-blue-600 dark:fill-blue-900/50 dark:stroke-blue-500"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                            ></path>
                            <circle
                                cx="40.0902"
                                cy="14.3443"
                                r="4.16393"
                                className="fill-blue-50 stroke-blue-600 dark:fill-blue-900/50 dark:stroke-blue-500"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                            ></circle>
                            <defs>
                                <filter
                                    id="filter4"
                                    x="13.5656"
                                    y="0"
                                    width="43.8689"
                                    height="50.7541"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB"
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                    <feColorMatrix
                                        in="SourceAlpha"
                                        type="matrix"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        result="hardAlpha"
                                    ></feColorMatrix>
                                    <feOffset dy="3"></feOffset>
                                    <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
                                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect4"></feBlend>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect4" result="shape"></feBlend>
                                </filter>
                            </defs>
                        </svg>
                    </span>

                    <div className="mt-4 flex flex-wrap justify-center text-sm/6 text-gray-600">
                        <span className="pe-1 font-medium text-gray-800 dark:text-neutral-200">
                            Drop your file here or
                        </span>
                        <label
                            htmlFor="fileUpload"
                            onClick={() => document.getElementById('fileUpload')?.click()}  // เพิ่มการคลิก
                            className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-hidden focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600"
                        >
                            browse
                        </label>
                        <input
                            type="file"
                            id="fileUpload"
                            onChange={handleFileUpload}
                            multiple
                            className="hidden"
                        />
                        <input id="dropzone-file" type="file" className="hidden" />

                    </div>

                    <p className="mt-1 text-xs text-gray-400 dark:text-neutral-400">Pick a file up to 2MB.</p>
                </div>
            </div>

            <div className="mt-4 space-y-2 empty:mt-0">
                {files.map((file, index) => (
                    <FilePreview
                        key={index}
                        fileName={file.name}
                        fileSize={file.size}
                        fileExtension={file.extension || ''}
                        progress={file.progress}
                        onRemove={() => handleRemoveFile(file.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
