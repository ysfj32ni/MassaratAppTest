'use client';
import Posts from "@/components/posts";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  const getAllPosts = async () => {
    const res = await fetch("http://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    // getAllPosts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Posts />
    </main>
  );
}
