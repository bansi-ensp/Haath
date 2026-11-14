export function Avatar({ initials, tone, size = 56 }: { initials: string; tone: string; size?: number }) {
  return (
    <span
      className="avatar"
      style={{ background: tone, width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
