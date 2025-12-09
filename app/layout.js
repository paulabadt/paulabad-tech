export const metadata = {
  title: 'Paula Abad | Desarrollador de Software',
  description: 'Análisis gratuito de sitios web con IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}