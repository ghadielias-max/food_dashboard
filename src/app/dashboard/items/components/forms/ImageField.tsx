interface Props {
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
}

export default function ImageField({ value, onChange, error }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <label
          className={`text-xs font-medium ${error ? "text-red-400" : "text-zinc-400"}`}
        >
          Item Image {error && "*"}
        </label>
      </div>

      <div className="flex gap-4 items-start">
        <div
          className={`w-24 h-24 rounded-xl bg-[#05050A] flex-shrink-0 flex items-center justify-center overflow-hidden relative border ${error ? "border-red-500/50" : "border-purple-900/20"}`}
        >
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <div
              className={`flex flex-col items-center gap-1 ${error ? "text-red-500/50" : "text-zinc-600"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="text-[9px]">Required</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            className={`w-full bg-[#05050A] border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
              error
                ? "border-red-500/50 focus:border-red-500 placeholder:text-red-500/30"
                : "border-purple-900/20 focus:border-purple-500"
            }`}
            placeholder="https://example.com/image.png"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          {error && (
            <p className="text-[10px] text-red-400">Image URL is required.</p>
          )}
        </div>
      </div>
    </div>
  );
}
