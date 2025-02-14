"use client";

import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";

import type { Article } from "../types";

type Props = {
  article: Article;
};

export const ArticleContent = ({ article }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-8"
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center cursor-pointer gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          記事一覧へ戻る
        </button>

        <article className="bg-white rounded-xl p-8 shadow-xs">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-slate-800 mb-4"
          >
            {article.title}
          </motion.h1>

          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Calendar className="w-4 h-4" />
            {dayjs(article.updated_at).format("YYYY.MM.DD HH:mm")}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 max-w-none whitespace-pre-wrap"
          >
            {article.content}
          </motion.div>
        </article>
      </motion.div>
    </div>
  );
};
