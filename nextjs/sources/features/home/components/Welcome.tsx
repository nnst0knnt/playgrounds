"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HEADLINES } from "../constants";

import type { Article } from "../types";

type Props = {
  headlines: Article[];
};

export const Welcome = ({ headlines }: Props) => {
  return (
    <div>
      <section className="bg-linear-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-slate-800 sm:text-5xl md:text-6xl">
              ようこそ 😊
            </h1>
            <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
              記事一覧から気になる記事をお探しください
            </p>
            <div className="mt-10">
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                記事一覧へ
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {headlines && headlines.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">新着記事</h2>
              <Link
                href="/articles"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                すべての記事を見る
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {headlines.slice(0, HEADLINES).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all"
                >
                  <Link href={`/articles/${article.id}`}>
                    <h3 className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-2">
                      {article.content}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
