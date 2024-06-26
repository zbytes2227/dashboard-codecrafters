"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'


const Page = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get('id')
  const [CustomerID, setcustomerID] = useState("");
  const [CustomerName, setCustomerName] = useState("");
  const [CustomerBranch, setCustomerBranch] = useState("CSE")
  const [CustomerPhone, setCustomerPhone] = useState("");
  const [CustomerCollege, setCustomerCollege] = useState("")
  const [CustomerPassword, setCustomerPassword] = useState("")
  const [CustomerEmail, setCustomerEmail] = useState("");
  const [msg, setmsg] = useState("")
  const [Loading, setLoading] = useState(false)
  
  const router = useRouter();


  function addCustomer() {
    // Fetch data from the API
    setLoading(true)
    const postData = {
      CustomerID: CustomerID,
      CustomerName: CustomerName,
      CustomerPhone: CustomerPhone,
      CustomerEmail: CustomerEmail,
      CustomerPassword: CustomerPassword,
      CustomerBranch: CustomerBranch,
      CustomerCollege: CustomerCollege
    };


    fetch("/api/addCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        setLoading(false)
        if (data.success) {
          router.push("/admin/products");
          console.log(data.customer);
          setCustomerName(data.customer.CustomerName)
          setCustomerPhone(data.customer.CustomerPhone)
          setCustomerEmail(data.customer.CustomerEmail)

        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };






  return (
    <>
      <div className="max-w-sm mx-auto mt-14 flex justify-around">
        <a href="/login" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-4 text-sm  sm:w-auto px-5 py-2.5 text-center"
        >Login</a>
        <a href="/register"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-4 text-sm  sm:w-auto px-5 py-2.5 text-center"
        >Register</a>
      </div>

      <div class="max-w-sm mt-5 mx-auto border border-3 rounded-lg p-5">
        <h2 className="mb-5 text-2xl font-bold text-center">
          Student Registration
        </h2>
        {!msg ? ("") : (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          {msg}
        </div>)}
        {/* <div class="mb-5">
          <label for="id" class="block mb-2 text-sm font-medium text-gray-900">
            Customer ID
          </label>
          <input
            value={CustomerID}
            onChange={(e) => setcustomerID(e.target.value)}
            type="text"
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
            placeholder="8253873893"
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
            placeholder="examplew@jf"
            required
          />
        </div>

        <div class="mb-5">
          <label
            for="CustomerPassword"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            id="CustomerPassword"
            value={CustomerPassword}
            onChange={(e) => setCustomerPassword(e.target.value)}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0"
            placeholder="password"
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

          onClick={addCustomer}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mt-4 text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {Loading ? 'Please Wait' : "Register"}
        </button>
      </div>
    </>
  );
};

export default Page;
