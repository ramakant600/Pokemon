'use client';
import Image from "next/image";
import axios from "axios";
import { useEffect } from "react";
import Home from "@/components/Home";

export default function Page() {
  return (
    <div className="h-full w-full max-w-screen min-w-screen min-h-screen overflow-x-hidden overflow-y-auto bg-white">
      <Home />
    </div>
  );
}
