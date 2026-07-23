function initials(title) {
  return title
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export default function PlaceholderCard({ title }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-[#8b5cf6]/20 to-transparent">
      <span className="font-heading text-4xl font-bold tracking-widest text-accent/70">{initials(title)}</span>
    </div>
  );
}
