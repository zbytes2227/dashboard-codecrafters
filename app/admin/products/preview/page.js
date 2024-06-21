
"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {

    const searchParams = useSearchParams();

    const search = searchParams.get('id')
    const [PDFid, setPDFid] = useState(search);




    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Share this link',
              text: text,
              url: url,
            });
            console.log('Content shared successfully');
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          console.log('Share API not supported in this browser');
        }
      };
    return (
        <>
            <div className='mt-20'>
                <div className='flex justify-around'>


<div class="inline-flex rounded-md shadow-sm" role="group">
  <a href='/admin/products' type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-900 bg-transparent border border-blue-900 rounded-s-lg hover:bg-blue-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-900 focus:text-white ">
  <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
    </svg>
    Back
  </a>
  <a href={`https://drive.usercontent.google.com/u/0/uc?id=${PDFid}&export=download>Download`} type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-900 bg-transparent border-t border-b border-blue-900 hover:bg-blue-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-900 focus:text-white ">
  <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
    </svg>
    Download
  </a>
  <a href={`https://api.whatsapp.com/send?text=Hey👋, Check this PDF on Code Crafters: https://dashboard.fgpcodecrafters.site/admin/products/preview?id=${PDFid}`} type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-900 bg-transparent border border-blue-900 rounded-e-lg hover:bg-blue-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-900 focus:text-white ">
  <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    </svg>
    Share
  </a>
</div>

                {/* <a >Back</a>
                <a href={`https://drive.usercontent.google.com/u/0/uc?id=${PDFid}&export=download>Download`}>Download</a>
                <a href={`https://drive.usercontent.google.com/u/0/uc?id=${PDFid}&export=download>Download`}>Share</a> */}
                </div>
                <div className='flex justify-center my-4'>
                <iframe src={`https://drive.google.com/file/d/${PDFid}/preview`} width="710" height="900" allow="autoplay"></iframe>
                </div>
            </div>

        </>
    )
}

export default Page
