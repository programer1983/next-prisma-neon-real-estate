export default function PropertyPageSkeleton() {
  return (
    <section className="bg-background py-15 animate-pulse">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div className="flex-1">
            <div className="h-4 w-28 rounded-full bg-black/5" />
            <div className="mt-4 h-12 w-full max-w-xl rounded-2xl bg-black/5" />

            <div className="mt-6 flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-9 w-32 rounded-full bg-black/5" />
              ))}
            </div>
          </div>

          {/* Right (Price Card) */}
          <div className="w-full lg:w-72 rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
            <div className="h-4 w-24 rounded-full bg-black/5" />
            <div className="mt-3 h-10 w-44 rounded-xl bg-black/5" />
          </div>
        </div>

        {/* Main Image */}
        <div className="my-6 h-60 w-full rounded-2xl bg-black/5 md:h-100 lg:h-120" />

        {/* Bottom Content & Form */}
        <div className="mt-16 gap-10 lg:grid lg:grid-cols-3">
          {/* Description Block */}
          <div className="col-span-2">
            <div className="rounded-4xl border border-black/5 bg-white p-8 shadow-sm">
              <div className="h-8 w-56 rounded-xl bg-black/5" />
              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded-full bg-black/5" />
                <div className="h-4 w-full rounded-full bg-black/5" />
                <div className="h-4 w-3/4 rounded-full bg-black/5" />
              </div>
            </div>
          </div>

          {/* Email Form Block */}
          <div className="mt-8 lg:mt-0 rounded-4xl border border-black/5 bg-white p-8 shadow-sm">
            <div className="h-7 w-40 rounded-xl bg-black/5" />
            <div className="mt-6 space-y-4">
              <div className="h-12 w-full rounded-xl bg-black/5" />
              <div className="h-12 w-full rounded-xl bg-black/5" />
              <div className="h-28 w-full rounded-xl bg-black/5" />
              <div className="h-12 w-full rounded-xl bg-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
