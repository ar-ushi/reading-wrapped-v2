import type { Component } from "solid-js";

interface UploadBoxProps {
  onFileSelect?: (file: File) => void;
}

const UploadBox: Component<UploadBoxProps> = (props) => {
  const handleChange = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    if (input.files?.[0]) {
      props.onFileSelect?.(input.files[0]);
    }
  };

  return (
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

      <p class="text-lg font-medium text-primary">Upload your reading data</p>

      <p class="text-sm text-gray-500 mt-1">Drag & drop or click to upload</p>

      <p class="text-xs text-gray-400 mt-3">
        Supported format: <span class="font-medium">.csv</span>
      </p>
    </label>
  );
};

export default UploadBox;
