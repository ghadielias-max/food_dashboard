"use client";

import { useBusinessStore } from "@/app/store/useBusinessStore";
import toast from "react-hot-toast";

export default function CreateItemsPage() {
  const addBusiness = useBusinessStore((s) => s.addBusiness);

  const handleCreate = () => {
    addBusiness({
      id: crypto.randomUUID(),
      ownerId: "owner-1",
      name: "Purple Burger",
      type: "RESTAURANT",
      categories: [],
    });

    toast.success("Business created 💜");
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold mb-6">Create Business</h2>

      <button onClick={handleCreate} className="px-4 py-2 bg-primary rounded">
        Create Mock Business
      </button>
    </div>
  );
}
