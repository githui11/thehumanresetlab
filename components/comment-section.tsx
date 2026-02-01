"use client";

import { useState } from "react";
import { MessageCircle, Send, Pencil, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
    id: string;
    user: string;
    date: string;
    text: string;
}

export function CommentSection({ initialComments }: { initialComments?: any[] }) {
    const [comments, setComments] = useState<Comment[]>(
        (initialComments || []).map((c, i) => ({ ...c, id: `init-${i}` }))
    );
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Editing State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !username.trim()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            const comment: Comment = {
                id: Date.now().toString(),
                user: username,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                text: newComment
            };

            setComments([...comments, comment]);
            setNewComment("");
            setIsSubmitting(false);
        }, 300);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this comment?")) {
            setComments(comments.filter(c => c.id !== id));
        }
    };

    const startEditing = (comment: Comment) => {
        setEditingId(comment.id);
        setEditText(comment.text);
    };

    const saveEdit = (id: string) => {
        if (!editText.trim()) return;
        setComments(comments.map(c => c.id === id ? { ...c, text: editText } : c));
        setEditingId(null);
    };

    return (
        <div className="mt-16 space-y-8">
            <h3 className="text-xl font-medium text-foreground flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Responses <span className="text-muted-foreground text-base">({comments.length})</span>
            </h3>

            <form onSubmit={handleSubmit} className="bg-card/50 rounded-2xl p-6 border border-border space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">Leave a thought</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="text"
                        placeholder="Your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="bg-background border-border"
                    />
                </div>
                <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    rows={3}
                    className="bg-background border-border resize-none"
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-full"
                    >
                        {isSubmitting ? "Posting..." : <><Send className="w-3 h-3" /> Post Comment</>}
                    </Button>
                </div>
            </form>

            <div className="space-y-6">
                {comments.map((comment, i) => (
                    <div key={comment.id} className="flex gap-4 p-6 bg-card/30 rounded-xl border border-border animate-in fade-in slide-in-from-bottom-2 duration-500 group">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 border border-primary/20">
                            {comment.user.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground">{comment.user}</span>
                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {editingId === comment.id ? (
                                        <>
                                            <Button size="icon" variant="ghost" onClick={() => saveEdit(comment.id)} className="text-green-500 hover:text-green-600 h-8 w-8"><Check className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="ghost" onClick={() => setEditingId(null)} className="text-destructive hover:text-destructive/80 h-8 w-8"><X className="w-4 h-4" /></Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button size="icon" variant="ghost" onClick={() => startEditing(comment)} className="text-muted-foreground hover:text-primary h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="ghost" onClick={() => handleDelete(comment.id)} className="text-muted-foreground hover:text-destructive h-8 w-8"><Trash2 className="w-4 h-4" /></Button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {editingId === comment.id ? (
                                <Textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="resize-none bg-background/50"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-muted-foreground leading-relaxed">{comment.text}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
