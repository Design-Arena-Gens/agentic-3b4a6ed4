export const metadata = {
  title: 'DesignArena.ai ? AI Design Battle',
  description: 'Vote. Compare. Discover. Where AIs Compete, Creativity Wins.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
