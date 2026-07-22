"use client";

import React from "react";
import { FaUserCircle, FaInfoCircle } from "react-icons/fa";

interface AuthorSchemaEditorProps {
    authorName: string;
    onChangeAuthorName: (val: string) => void;
    authorType: "Person" | "Organization";
    onChangeAuthorType: (val: "Person" | "Organization") => void;
    authorUrl: string;
    onChangeAuthorUrl: (val: string) => void;
}

export default function AuthorSchemaEditor({
    authorName,
    onChangeAuthorName,
    authorType,
    onChangeAuthorType,
    authorUrl,
    onChangeAuthorUrl,
}: AuthorSchemaEditorProps) {
    return (
        <div className="space-y-4 p-5 rounded-xl border border-border bg-card/50 shadow-sm">
            <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <FaUserCircle className="w-5 h-5 text-primary" />
                    Author Schema Details (for SEO schema only)
                </h3>

                <div className="mt-2 text-xs text-text-secondary flex items-start gap-2 p-3 rounded-lg bg-background border border-border">
                    <FaInfoCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p>
                        Configure the author details used exclusively in the BlogPosting JSON-LD schema for search engine rich results.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium mb-1 text-text-secondary">
                        Author Name
                    </label>
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => onChangeAuthorName(e.target.value)}
                        placeholder="Shubham Kumar"
                        className="w-full p-2 text-sm border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1 text-text-secondary">
                        Author Type
                    </label>
                    <select
                        value={authorType}
                        onChange={(e) => onChangeAuthorType(e.target.value as "Person" | "Organization")}
                        className="w-full p-2 text-sm border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                    >
                        <option value="Person">Person</option>
                        <option value="Organization">Organization</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1 text-text-secondary">
                        Author URL (Optional)
                    </label>
                    <input
                        type="url"
                        value={authorUrl}
                        onChange={(e) => onChangeAuthorUrl(e.target.value)}
                        placeholder="https://mind-stuff.in or https://twitter.com/username"
                        className="w-full p-2 text-sm border rounded bg-background border-border text-foreground focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>
            </div>
        </div>
    );
}
