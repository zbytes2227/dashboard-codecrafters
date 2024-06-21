import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Code Crfaters",
  description: "Dashboard Code Crafters",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="md:pl-24 md:ml-40">
          {children}
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" defer />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
      !function(t,e){
        t.artibotApi={l:[],t:[],on:function(){this.l.push(arguments)},trigger:function(){this.t.push(arguments)}};
        var a=!1,i=e.createElement("script");
        i.async=!0,i.type="text/javascript",i.src="https://app.artibot.ai/loader.js";
        e.getElementsByTagName("head").item(0).appendChild(i);
        i.onreadystatechange=i.onload=function(){
          if(!(a||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState)){
            new window.ArtiBot({i:"d569fab1-754b-4a88-9488-a2826f99ad59"});
            a=!0
          }
        }
      }(window,document);
    `,
          }}
        />

      </body>

    </html>
  );
}
