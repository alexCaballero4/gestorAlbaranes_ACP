"use client";

import CreateDeliveryNoteForm from "@/app/components/forms/CreateDeliveryNoteForm";
import Header from "@/app/components/ui/Header";
import Menu from "@/app/components/ui/Menu";
import Footer from "@/app/components/ui/Footer";

export default function CreateDeliveryNotePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <Menu />
      <main className="flex-1 container mx-auto p-6">
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Crear Albarán</h2>
          <CreateDeliveryNoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
