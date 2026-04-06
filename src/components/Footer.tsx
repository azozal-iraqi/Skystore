interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer className="pb-20 pt-8 text-center">
      <p className="text-gray-600 text-xs">
        &copy; 2026 Sky Face. All Rights Reserved. Developed by:{' '}
        <span className="text-neon-blue">Ezaldeen Jassam</span>
      </p>
      <button
        onClick={onAdminClick}
        className="mt-2 text-gray-800 text-[8px] hover:text-gray-600 transition-colors"
      >
        Admin
      </button>
    </footer>
  );
}
