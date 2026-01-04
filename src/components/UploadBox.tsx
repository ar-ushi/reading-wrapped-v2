import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { Heading } from "./ui";
interface UploadBoxProps {
  onFileSelect?: (file: File) => void;
}

const UploadBox: Component<UploadBoxProps> = (props) => {
  const [localFile, setLocalFile] = createSignal<File | null>(null);
  const handleChange = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    if (input.files?.[0]) {
      setLocalFile(input.files[0]);
      props.onFileSelect?.(input.files[0]);
    }
  };

  return (
    <div>
      {localFile() ? (
        <Heading variant="h3" class="text-primary">
          File Uploaded Successfully
        </Heading>
      ) : (
        <label
          class="
        flex flex-col items-center justify-center
        w-full max-w-md
        rounded-2xl
        border-2 border-dashed border-gray-300
        bg-white
        p-8
        cursor-pointer
        hover:border-gray-400
        hover:bg-gray-50
        transition
      "
        >
          <input
            type="file"
            accept=".csv"
            class="block hidden"
            onChange={handleChange}
          />

          <Heading variant="h3" compact class="text-tertiary">
            Upload your reading data
          </Heading>

          <p class="text-sm text-gray-500 mt-1">
            Drag & drop or click to upload
          </p>

          <p class="text-xs text-gray-400 mt-3">
            Supported format: <span class="font-medium">.csv</span>
          </p>
        </label>
      )}
    </div>
  );
};

export default UploadBox;
