export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-center">
      <p className="font-mono text-xs text-gray-600">
        © {new Date().getFullYear()} Ismail Ait Rehail
      </p>
    </footer>
  );
}