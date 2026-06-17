import stitched from "@/assets/app-preview-stitched.jpg.asset.json";

const AppPreviewPhone = () => {
  return (
    <div className="w-full md:w-auto flex justify-center py-10 md:py-0">
      <div
        className="relative w-[min(320px,80vw)] md:w-[640px]"
        style={{
          aspectRatio: "9 / 19.5",
        }}
      >
        {/* Phone outer frame */}
        <div
          className="absolute inset-0 rounded-[44px] bg-neutral-900"
          style={{
            boxShadow:
              "0 30px 60px -20px rgba(0,0,0,0.45), 0 10px 30px -10px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.06)",
            padding: "10px",
          }}
        >
          {/* Inner screen */}
          <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-white">
            {/* Scrollable content */}
            <div
              className="w-full h-full overflow-y-auto overscroll-contain"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <style>{`.phone-scroll::-webkit-scrollbar{display:none}`}</style>
              <img
                src={stitched.url}
                alt="AviSafe mobilapp preview"
                className="w-full h-auto block select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Dynamic island / notch */}
            <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 h-6 w-24 rounded-full bg-black z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreviewPhone;
