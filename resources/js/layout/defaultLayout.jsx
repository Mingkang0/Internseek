import react from "react";
import Navbar from "../components/navbar";
import { Head } from "@inertiajs/react";
import 'flowbite/dist/flowbite.css';

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