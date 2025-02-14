"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="h-full bg-slate-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <h1 className="text-9xl font-bold text-slate-800">500</h1>
        <p className="mt-4 text-xl text-slate-600">
          予期せぬエラーが発生しました
        </p>
        <p className="mt-2 text-slate-500">
          時間をおいて再度アクセスしてください
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          ホームに戻る
        </Link>
      </motion.div>
    </div>
  );
}
