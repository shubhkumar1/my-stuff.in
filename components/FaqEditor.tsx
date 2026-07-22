"use client";

import React from "react";
import { FAQItem } from "@/types";
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

interface FaqEditorProps {
    faqs: FAQItem[];
    onChange: (faqs: FAQItem[]) => void;
}

export default function FaqEditor({ faqs, onChange }: FaqEditorProps) {
    const handleAdd = () => {
        onChange([...faqs, { question: "", answer: "" }]);
    };

    const handleRemove = (index: number) => {
        const newFaqs = faqs.filter((_, i) => i !== index);
        onChange(newFaqs);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newFaqs = [...faqs];
        const temp = newFaqs[index - 1];
        newFaqs[index - 1] = newFaqs[index];
        newFaqs[index] = temp;
        onChange(newFaqs);
    };

    const handleMoveDown = (index: number) => {
        if (index === faqs.length - 1) return;
        const newFaqs = [...faqs];
        const temp = newFaqs[index + 1];
        newFaqs[index + 1] = newFaqs[index];
        newFaqs[index] = temp;
        onChange(newFaqs);
    };

    const handleChange = (index: number, field: "question" | "answer", value: string) => {
        const newFaqs = faqs.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        onChange(newFaqs);
    };

    return (
        <div className="space-y-4 p-5 rounded-xl border border-border bg-card/50 shadow-sm">
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        FAQ (for SEO schema only)
                        <span className="text-xs font-normal px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            {faqs.length} {faqs.length === 1 ? "item" : "items"}
                        </span>
                    </h3>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="flex items-center gap-1.5 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded transition shadow-sm"
                    >
                        <FaPlus className="w-3 h-3" /> Add Q&A Pair
                    </button>
                </div>

                <div className="mt-2 text-xs text-text-secondary flex items-start gap-2 p-3 rounded-lg bg-background border border-border">
                    <FaInfoCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p>
                        This content is for search engine rich results only and will not appear on the published page — write it manually to match your FAQ section in the post body.
                    </p>
                </div>
            </div>

            {faqs.length > 0 && faqs.length < 2 && (
                <div className="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <FaExclamationTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                        FAQPage schema typically requires at least 2 Q&A entries (3-5 recommended) to trigger search engine rich results.
                    </p>
                </div>
            )}

            {faqs.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-border rounded-lg text-text-secondary text-sm">
                    No schema FAQs added yet. Click &quot;Add Q&amp;A Pair&quot; above to create structured data for search engines.
                </div>
            ) : (
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-lg bg-background border border-border space-y-3 relative group transition hover:border-primary/40"
                        >
                            <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2">
                                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                    Q&amp;A Pair #{index + 1}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => handleMoveUp(index)}
                                        disabled={index === 0}
                                        className="p-1.5 text-text-secondary hover:text-foreground disabled:opacity-30 disabled:hover:text-text-secondary transition rounded hover:bg-border/50"
                                        title="Move Up"
                                    >
                                        <FaArrowUp className="w-3 h-3" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleMoveDown(index)}
                                        disabled={index === faqs.length - 1}
                                        className="p-1.5 text-text-secondary hover:text-foreground disabled:opacity-30 disabled:hover:text-text-secondary transition rounded hover:bg-border/50"
                                        title="Move Down"
                                    >
                                        <FaArrowDown className="w-3 h-3" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                        className="p-1.5 text-red-500 hover:text-red-600 transition rounded hover:bg-red-500/10 ml-1"
                                        title="Remove Q&A Pair"
                                    >
                                        <FaTrash className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1 text-text-secondary">
                                    Question
                                </label>
                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => handleChange(index, "question", e.target.value)}
                                    placeholder="e.g. What is Next.js App Router?"
                                    className="w-full p-2 text-sm border rounded bg-card border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium mb-1 text-text-secondary">
                                    Answer
                                </label>
                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => handleChange(index, "answer", e.target.value)}
                                    placeholder="e.g. Next.js App Router is a component-based routing system built on React Server Components."
                                    rows={2}
                                    className="w-full p-2 text-sm border rounded bg-card border-border text-foreground focus:ring-1 focus:ring-primary outline-none resize-y"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
