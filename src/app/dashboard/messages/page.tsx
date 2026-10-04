"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import {
  Send,
  Paperclip,
  X,
  FileText,
  Download,
  Image as ImageIcon,
  Plus,
  MessageSquare,
  Circle,
  Check,
  CheckCheck,
  Loader2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string | null;
  message_type: "text" | "file" | "image" | "system";
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  is_read: boolean;
  created_at: string;
};

type Conversation = {
  id: string;
  client_id: string;
  subject: string;
  status: string;
  last_message_at: string;
  created_at: string;
  last_message?: string;
  unread_count?: number;
};

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */
export default function MessagingPage() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [showNewConv, setShowNewConv] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [typing, setTyping] = useState(false);

  /* ---- Auth ---- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
        supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()
          .then(({ data: p }) => setProfile(p));
      }
    });
  }, []);

  /* ---- Load conversations ---- */
  const loadConversations = useCallback(async () => {
    if (!userId) return;
    setLoadingConvs(true);
    const { data } = await supabase
      .from("conversations")
      .select("*")
      .order("last_message_at", { ascending: false });

    if (data) {
      // Get last message + unread count for each
      const enriched = await Promise.all(
        data.map(async (conv) => {
          const { data: msgs } = await supabase
            .from("messages")
            .select("content, is_read, sender_id")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1);

          const { count } = await supabase
            .from("messages")
            .select("id", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .eq("is_read", false)
            .neq("sender_id", userId);

          return {
            ...conv,
            last_message: msgs?.[0]?.content ?? "No messages yet",
            unread_count: count ?? 0,
          };
        })
      );
      setConversations(enriched);
    }
    setLoadingConvs(false);
  }, [userId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  /* ---- Load messages for active conversation ---- */
  const loadMessages = useCallback(async (convId: string) => {
    setLoadingMsgs(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });

    if (data) setMessages(data);

    // Mark all as read
    if (userId) {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("conversation_id", convId)
        .neq("sender_id", userId);
    }
    setLoadingMsgs(false);
  }, [userId]);

  useEffect(() => {
    if (activeConv) loadMessages(activeConv.id);
  }, [activeConv, loadMessages]);

  /* ---- Realtime subscription ---- */
  useEffect(() => {
    if (!activeConv) return;

    const channel = supabase
      .channel(`messages:${activeConv.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConv.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            if (prev.find((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          // Mark as read if from other person
          if (newMsg.sender_id !== userId) {
            supabase
              .from("messages")
              .update({ is_read: true })
              .eq("id", newMsg.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConv, userId]);

  /* ---- Auto-scroll ---- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---- Auto-resize textarea ---- */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  /* ---- Send message ---- */
  const sendMessage = async () => {
    if (!activeConv || !userId || sending) return;
    if (!input.trim() && !pendingFile) return;

    setSending(true);
    let fileUrl: string | null = null;
    let fileName: string | null = null;
    let fileSize: number | null = null;
    let msgType: "text" | "file" | "image" = "text";

    // Upload file if pending
    if (pendingFile) {
      setUploading(true);
      const ext = pendingFile.name.split(".").pop();
      const path = `${userId}/${activeConv.id}/${Date.now()}.${ext}`;
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from("message-attachments")
        .upload(path, pendingFile);

      if (!uploadErr && uploadData) {
        const { data: urlData } = supabase.storage
          .from("message-attachments")
          .getPublicUrl(uploadData.path);
        fileUrl = urlData.publicUrl;
        fileName = pendingFile.name;
        fileSize = pendingFile.size;
        msgType = pendingFile.type.startsWith("image/") ? "image" : "file";
      }
      setUploading(false);
    }

    const { error } = await supabase.from("messages").insert({
      conversation_id: activeConv.id,
      sender_id: userId,
      content: input.trim() || null,
      message_type: msgType,
      file_url: fileUrl,
      file_name: fileName,
      file_size: fileSize,
    });

    if (!error) {
      setInput("");
      setPendingFile(null);
    }
    setSending(false);
  };

  /* ---- Create new conversation ---- */
  const createConversation = async () => {
    if (!userId || !newSubject.trim()) return;
    const { data, error } = await supabase
      .from("conversations")
      .insert({ client_id: userId, subject: newSubject.trim() })
      .select()
      .single();

    if (!error && data) {
      setShowNewConv(false);
      setNewSubject("");
      await loadConversations();
      setActiveConv(data);
    }
  };

  /* ---- File pick ---- */
  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPendingFile(file);
  };

  /* ---- Key handler ---- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
      {/* ---- Left Panel: Conversation List ---- */}
      <div className="w-72 lg:w-80 flex-shrink-0 border-r border-slate-200 flex flex-col bg-slate-50">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-lg">Messages</h2>
          <button
            onClick={() => setShowNewConv(true)}
            className="w-8 h-8 bg-[#F56962] text-white rounded-lg flex items-center justify-center hover:bg-[#e05a53] transition-colors"
            title="New conversation"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* New Conversation Modal */}
        {showNewConv && (
          <div className="p-4 border-b border-slate-200 bg-white">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              New Conversation
            </p>
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Subject (e.g. Website Revamp)"
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#F56962]/30"
              onKeyDown={(e) => e.key === "Enter" && createConversation()}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={createConversation}
                className="flex-1 bg-[#F56962] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#e05a53]"
              >
                Create
              </button>
              <button
                onClick={() => { setShowNewConv(false); setNewSubject(""); }}
                className="flex-1 bg-slate-100 text-slate-600 text-xs font-semibold py-2 rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto">
          {loadingConvs ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <MessageSquare className="w-10 h-10 text-slate-300 mb-3" />
              <p className="text-sm text-slate-500">No conversations yet</p>
              <p className="text-xs text-slate-400 mt-1">Click + to start one</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv)}
                className={`w-full text-left p-4 border-b border-slate-100 hover:bg-white transition-colors ${
                  activeConv?.id === conv.id
                    ? "bg-white border-l-2 border-l-[#F56962]"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="font-semibold text-sm text-slate-900 truncate flex-1 pr-2">
                    {conv.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">
                    {formatTime(conv.last_message_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 truncate flex-1">
                    {conv.last_message}
                  </p>
                  {(conv.unread_count ?? 0) > 0 && (
                    <span className="ml-2 bg-[#F56962] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ---- Right Panel: Chat Window ---- */}
      {activeConv ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <div>
              <h3 className="font-bold text-slate-900">{activeConv.subject}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                <span className="text-xs text-slate-500">Support Team Online</span>
              </div>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                activeConv.status === "open"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {activeConv.status}
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {loadingMsgs ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <MessageSquare className="w-12 h-12 text-slate-200 mb-3" />
                <p className="text-sm text-slate-500">
                  No messages yet. Say hello! 👋
                </p>
              </div>
            ) : (
              messages.map((msg, i) => {
                const isMine = msg.sender_id === userId;
                const showDate =
                  i === 0 ||
                  new Date(msg.created_at).toDateString() !==
                    new Date(messages[i - 1].created_at).toDateString();

                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div className="flex items-center justify-center my-4">
                        <span className="text-[11px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                          {new Date(msg.created_at).toLocaleDateString([], {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    {msg.message_type === "system" ? (
                      <div className="flex justify-center">
                        <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                          {msg.content}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
                      >
                        {!isMine && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-1">
                            S
                          </div>
                        )}
                        <div className={`max-w-[70%] ${isMine ? "items-end" : "items-start"} flex flex-col gap-1`}>
                          {/* File/Image content */}
                          {msg.message_type === "image" && msg.file_url && (
                            <div className={`rounded-2xl overflow-hidden ${isMine ? "rounded-br-sm" : "rounded-bl-sm"}`}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={msg.file_url}
                                alt={msg.file_name ?? "Image"}
                                className="max-w-full max-h-48 object-cover"
                              />
                            </div>
                          )}
                          {msg.message_type === "file" && msg.file_url && (
                            <a
                              href={msg.file_url}
                              download={msg.file_name ?? true}
                              target="_blank"
                              rel="noreferrer"
                              className={`flex items-center gap-3 p-3 rounded-2xl ${
                                isMine
                                  ? "bg-[#F56962] text-white rounded-br-sm"
                                  : "bg-white border border-slate-200 text-slate-900 rounded-bl-sm"
                              }`}
                            >
                              <FileText className="w-5 h-5 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-semibold truncate">{msg.file_name}</p>
                                {msg.file_size && (
                                  <p className={`text-[10px] ${isMine ? "text-white/70" : "text-slate-400"}`}>
                                    {formatFileSize(msg.file_size)}
                                  </p>
                                )}
                              </div>
                              <Download className="w-4 h-4 flex-shrink-0" />
                            </a>
                          )}
                          {/* Text content */}
                          {msg.content && (
                            <div
                              className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                isMine
                                  ? "bg-[#F56962] text-white rounded-br-sm"
                                  : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
                              }`}
                            >
                              {msg.content}
                            </div>
                          )}
                          {/* Time + read receipt */}
                          <div className={`flex items-center gap-1 ${isMine ? "justify-end" : "justify-start"}`}>
                            <span className="text-[10px] text-slate-400">
                              {formatTime(msg.created_at)}
                            </span>
                            {isMine && (
                              msg.is_read
                                ? <CheckCheck className="w-3 h-3 text-[#F56962]" />
                                : <Check className="w-3 h-3 text-slate-400" />
                            )}
                          </div>
                        </div>
                        {isMine && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F56962] to-orange-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-1">
                            {profile?.full_name?.[0]?.toUpperCase() ?? "U"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 bg-white">
            {/* Pending file preview */}
            {pendingFile && (
              <div className="mb-3 flex items-center gap-2 bg-slate-50 rounded-xl p-2 border border-slate-200">
                {pendingFile.type.startsWith("image/") ? (
                  <ImageIcon className="w-4 h-4 text-violet-500 flex-shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className="text-xs text-slate-700 truncate flex-1">
                  {pendingFile.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {formatFileSize(pendingFile.size)}
                </span>
                <button
                  onClick={() => setPendingFile(null)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-end gap-2">
              {/* File attach */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*,.pdf,.txt,.zip"
                onChange={handleFilePick}
              />

              {/* Text input */}
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#F56962]/30 focus-within:border-[#F56962]/50">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                  className="w-full resize-none bg-transparent px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none min-h-[40px] max-h-[120px]"
                  rows={1}
                />
              </div>

              {/* Send button */}
              <button
                onClick={sendMessage}
                disabled={(!input.trim() && !pendingFile) || sending || uploading}
                className="w-9 h-9 rounded-xl bg-[#F56962] hover:bg-[#e05a53] flex items-center justify-center text-white flex-shrink-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending || uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ---- Empty State ---- */
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 bg-slate-50">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center mb-5">
            <MessageSquare className="w-10 h-10 text-violet-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Your Messages</h3>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            Select a conversation from the left, or start a new one to chat directly with your project manager.
          </p>
          <button
            onClick={() => setShowNewConv(true)}
            className="flex items-center gap-2 bg-[#F56962] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e05a53] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Conversation
          </button>
        </div>
      )}
    </div>
  );
}