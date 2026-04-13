import Navbar from "./components/Navbar";
import { ShopProvider } from "./context/ShopContext";
import "./globals.css";

export const metadata = {
  title: "Kipepeo Fashion",
  description: "Making your dream a reality",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ShopProvider>
          <Navbar />
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}