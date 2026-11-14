export default function CardSceleton() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 my-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-105 animate-pulse rounded-3xl bg-black/5 "
        />
      ))}
    </div>
  );
}
