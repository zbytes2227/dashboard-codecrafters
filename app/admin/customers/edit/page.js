"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('id')
  const [CustomerID, setcustomerID] = useState('');
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerBranch, setCustomerBranch] = useState("CSE")
  const [CustomerCollege, setCustomerCollege] = useState("")
  const [CustomerPhone, setCustomerPhone] = useState("");
  const [CustomerEmail, setCustomerEmail] = useState("");
  const [msg, setmsg] = useState("")

  const postData = {
    customerid: CustomerID,
    // Add other properties if needed
  };
  useEffect(() => {
    auth()
  }, []);

  const router = useRouter();
  async function auth() {
    const fetch_api = await fetch("/api/auth/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await fetch_api.json();
    setcustomerID(data.user_details.id)
    if (!data.success) {
      router.push("/login");
    }

    fetch("/api/getCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerid: data.user_details.id }),
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.customer);
          setCustomerName(data.customer.CustomerName)
          setCustomerPhone(data.customer.CustomerPhone)
          setCustomerEmail(data.customer.CustomerEmail)
          setCustomerBranch(data.customer.CustomerBranch)
          setCustomerCollege(data.customer.CustomerCollege)
        } else {
          console.error("API request failed");
        }
      })
  };


  function updateDetails() {
    fetch("/api/editCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ CustomerID: CustomerID, CustomerName: CustomerName, CustomerPhone: CustomerPhone, CustomerEmail: CustomerEmail, CustomerCollege: CustomerCollege, CustomerBranch: CustomerBranch }),
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        if (data.success) {
          console.log(data);
          setTimeout(() => {
            window.location.href = "/admin/customers"; // Replace "/your-target-page" with the actual target page URL
          }, 1000);
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <>
      <div className="mt-20">
        <h2 className="mb-5 text-2xl font-bold text-center">
          Edit Customer Details
        </h2>
      </div>
      <div class="max-w-sm mx-auto border border-3 rounded-lg p-5">
        {!msg ? ("") : (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          {msg}
        </div>)}
        {/* <div class="mb-5">
          <label for="id" class="block mb-2 text-sm font-medium text-gray-900">
            Customer ID
          </label>
          <input
            value={CustomerID}
            type="text"
            disabled
            id="id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div> */}
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            value={CustomerName}
            onChange={(e) => setCustomerName(e.target.value)}
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="class"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            value={CustomerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            type="text"
            id="class"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="10A"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="Contact"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            id="Contact"
            value={CustomerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="27657265"
            required
          />
        </div>


        <div class="mb-5">
          <label
            for="Contact"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            College
          </label>
          <input
            id="Contact"
            value={CustomerCollege}
            onChange={(e) => setCustomerCollege(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="fgp"
            required
          />
        </div>


        <div>
          <label for="status" class="block mb-2 text-sm font-medium text-gray-900">Your Branch or Trade</label>
          <select value={CustomerBranch} onChange={(e) => setCustomerBranch(e.target.value)} name="status" id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics Engineering</option>
            <option value="EC">Electrical Engineering</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
          </select>
        </div>
        {/* <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required/>
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900">Remember me</label>
  </div> */}
        <button

          onClick={updateDetails}
          class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Page;
