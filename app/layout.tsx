import "./globals.css";

export const metadata = {
  title: "Felhő Asztal",
};

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
