"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Papa from 'papaparse';

const Page = () => {
  const [Products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [Loading, setLoading] = useState(true)
  const [CustomerBranch, setCustomerBranch] = useState("CSE")
  const [CustomerSemester, setCustomerSemester] = useState("1")


  useEffect(() => {
    auth();
    setLoading(true)
    getNotes(CustomerBranch, CustomerSemester)
    fetch("/api/getProduct")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        if (data.success) {
          setProducts(data.Product);
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  async function getNotes(branch, semester) {
    const fetch_api = await fetch("/api/getProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ branch: branch, semester: semester })
    });

    const data = await fetch_api.json();
    console.log(data);
    setProducts(data.Product);
  };


  const router = useRouter();
  async function auth() {
    const fetch_api = await fetch("/api/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    if (!data.success) {
      router.push("/login");
    }
  };


  const exportToCSV = (data) => {
    const filteredData = data.map(({ __v, _id, ...rest }) => rest);

    // Convert the filtered data to CSV
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'order-report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Your browser does not support downloading files.');
    }
  };

  function report() {
    exportToCSV(Products);
  }
  return (
    <>
      <div class="p-4 mx-auto container mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen ">

          <div class=" mt-14  pb-4">
            <form>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Search Subject..."
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {/* <a href="products/add" type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">New Product</a> */}
          <div className="flex justify-center items-center flex-wrap flex-col md:flex-row">


            <label for="status" class=" text-sm font-medium text-gray-900"> Branch :{" "}</label>
            <select value={CustomerBranch} onChange={(e) => { setCustomerBranch(e.target.value); getNotes(e.target.value, CustomerSemester) }} name="status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" required>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics Engineering</option>
              <option value="EC">Electrical Engineering</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
            </select>



            <label for="status" class="sm:ms-6 sm:mt-0 mt-5 text-sm font-medium text-gray-900">Semester :{" "}</label>
            <select value={CustomerSemester} onChange={(e) => { setCustomerSemester(e.target.value); getNotes(CustomerBranch, e.target.value) }} name="status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" required>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
              <option value="4">4th Semester</option>
              <option value="5">5th Semester</option>
              <option value="6">6th Semester</option>

            </select>
          </div>

          <div className="mt-5">
            {Products && Array.isArray(Products) && Products.map((product) => (
              <div key={product._id} className="product">

                <div class="max-w md:mx-10 p-6 bg-white flex justify-between items-center border border-gray-200 rounded-lg shadow mt-2">
                  <div>
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{product.ProductName}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 ">{product.ProductBranch} | Semester- {product.ProductSemester}  | Year- {product.ProductSemester === "1" || product.ProductSemester === "2" ? 1 : product.ProductSemester === "3" || product.ProductSemester === "4" ? 2 : product.ProductSemester === "5" || product.ProductSemester === "6" ? 3 : ''} </p>
                  </div>
                  <div>
                    <a href={`/admin/products/preview?id=${product.ProductLink}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                      View
                      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>


            ))}
          </div>

          {!Loading ? "" : (
            <div role="status" className="flex justify-center">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default Page;
