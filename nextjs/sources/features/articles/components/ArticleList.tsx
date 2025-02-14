"use client";

import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight } from "lucide-react";

import type { Article } from "../types";

type Props = {
  articles: Article[];
};

export const ArticleList = ({ articles }: Props) => {
  const router = useRouter();

  return (
    <div className="bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-slate-800">記事一覧</h1>

        <div className="grid gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all cursor-pointer"
              onClick={() => router.push(`/articles/${article.id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-slate-600 line-clamp-2">
                    {article.content}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {dayjs(article.updated_at).format("YYYY.MM.DD")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {dayjs(article.updated_at).format("HH:mm")}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
