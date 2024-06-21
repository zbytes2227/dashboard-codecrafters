
"use client"
import auth from "@/pages/api/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [Dashboard, setDashboard] = useState('');
  const [Admin, setAdmin] = useState(false)
  const [msg, setmsg] = useState("")
  useEffect(() => {

    auth();

    fetch("/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        if (data.success) {
          console.log(data);
          setDashboard(data);
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [])

  const router = useRouter();
  async function auth() {
    const fetch_api = await fetch("/api/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (!data.success) {
      router.push("/login");
    } else {
      setAdmin(true)
    }
  }


  return (
    <>{Admin ?  <> <div class="p-4 mx-auto container mt-20 text-center">

    </div>
      <div className=" mx-auto container p-4 justify-between text-center">

        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          <span class="text-lg block text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400 font-semibold text-red-500 lg:text-2xl">
            WELCOME TO
          </span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            CODE
          </span>{" "}
          CRAFTERS
        </h1>
        <div className="mx-auto container flex-wrap flex justify-between text-center p-5 max-w-max">

          <a href="/admin/products" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-2">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">NOTES & RESOURCES</h5>
            <p class="font-extrabold text-3xl text-gray-700 ">{Dashboard.Customers}</p>
          </a>

          <a href="/admin/updates" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-2">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">ALL UPDATES & JOBS</h5>
            <p class="font-extrabold text-3xl text-gray-700 ">{Dashboard.Updates}</p>
          </a>

        </div>

      <section class="text-gray-600 body-font">
  <div class="container px-5 py-10 mx-auto">
    <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline-block w-8 h-8 text-gray-400 mb-8" viewBox="0 0 975.036 975.036">
        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
      </svg>
      <p class="leading-relaxed text-lg">You can find updates on BTEUP exams, job alerts, important notes, and key questions on this platform. Click the <a className="text-blue-600" href="/admin/products">link to access all notes</a>  and resources.</p>

      <p class="leading-relaxed font-semibold text-lg mt-7">आप इस प्लेटफ़ॉर्म पर बीटीईयूपी परीक्षाओं, नौकरी अपडेट्स, महत्वपूर्ण नोट्स और महत्वपूर्ण प्रश्नों के अपडेट पा सकते हैं। इस लिंक पर क्लिक करके आप सभी नोट्स और संसाधनों तक पहुँच सकते हैं।</p>
      
      <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
      <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">TEAM BHARATGEN</h2>
      <p class="text-gray-500">Raebareli</p>
    </div>
  </div>
</section>
</div>
      
      </>:<><div class="p-4 mx-auto container mt-20 text-center">
      👾Please Wait👾
</div></>}


    </>
  );
}
