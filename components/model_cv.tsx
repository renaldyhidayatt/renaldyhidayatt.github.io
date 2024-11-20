"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function ModalCV() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="mt-4" style={{ marginLeft: "20px" }}>
        <Button onClick={openModal}>View My CV</Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-[90%] max-w-4xl rounded-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My CV</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                ✖
              </button>
            </div>
            <div className="w-full h-[500px]">
              <iframe
                src="https://drive.google.com/file/d/1RU7a6INWQ5-vezuClceV8i04NZ-Oxj58/preview"
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
