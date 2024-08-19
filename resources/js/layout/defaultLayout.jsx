import react from "react";
import Navbar from "../components/navbar";
import { Head } from "@inertiajs/react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="Layout">
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default DefaultLayout;