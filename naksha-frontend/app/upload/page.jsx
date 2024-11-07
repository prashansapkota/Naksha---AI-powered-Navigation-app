"use client";

import { useState } from 'react';
import ImageCapture from '@/components/ImageCapture';
import ImageUpload from '@/components/ImageUpload';
import { Tab } from '@headlessui/react';

export default function UploadPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Capture or Upload Building Image
        </h1>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected 
                   ? 'bg-white shadow text-blue-700'
                   : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                 }`
              }
            >
              Take Photo
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${selected
                   ? 'bg-white shadow text-blue-700'
                   : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                 }`
              }
            >
              Upload Image
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <ImageCapture />
            </Tab.Panel>
            <Tab.Panel>
              <ImageUpload />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
} 