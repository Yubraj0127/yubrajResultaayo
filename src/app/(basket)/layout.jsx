import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Copyright from "@/components/Mini Component/Copyright";
export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Copyright/>
      
    </div>
  );
}
