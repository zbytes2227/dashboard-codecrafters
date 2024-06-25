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
          <head>
      <link rel="icon" href="/image/favicon.ico"/>
      <link rel="manifest" href="/manifest.json"/>
      <meta name="theme-color" content="#0088ff" />
      <meta property="og:title" content="Code Crafters FGP" />
      <meta property="og:type" content="website" />
      <meta property="og:URL" content="http://dashboard.fgpcodecrafters.site" />
      <meta property="og:image" content="https://fgpcodecrafters.site/192.png" />
      <meta name="keywords" content="Feroze Gandhi Polytechnic, FGP raebareli, code crafters, codecrfaters, fgpcodecrafters,code-crafters fgp, codecraftersfgp"/>
      <meta property="og:description" content="Welcome to Code Crafters Community, your hub for student collaboration and innovation. Join us to explore coding, share ideas, and create together!" />
      <meta name="robots" content="index, follow"/>
      </head>
      <body className={inter.className}>
        <Navbar />
        <div className="md:pl-24 md:ml-40">
          {children}
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" async />

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
