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
  Search,
  CheckCircle,
  Archive,
  RefreshCw,
} from "lucide-react";

export type Message = {
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

export type Conversation = {
  id: string;
  client_id: string;
  subject: string;
  status: string;
  last_message_at: string;
  created_at: string;
  last_message?: string;
  unread_count?: number;
  client_name?: string;
  client_email?: string;
};

export type ClientOption = {
  id: string;
  full_name: string | null;
  email: string;
};

function formatTime(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatFileSize(bytes: number) {
  if (!bytes) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function AdminMessagesPanel({
  initialClients = [],
}: {
  initialClients?: ClientOption[];
}) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all");

  // New Thread Modal
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newFirstMessage, setNewFirstMessage] = useState("");
  const [creatingThread, setCreatingThread] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setCurrentUserId(data.user.id);
      }
    });
  }, [supabase]);

  const loadConversations = useCallback(async () => {
    setLoadingConvs(true);
    try {
      const { data: convData, error } = await supabase
        .from("conversations")
        .select("*")
        .order("last_message_at", { ascending: false });

      if (error) {
        console.error("Error loading conversations:", error);
        setLoadingConvs(false);
        return;
      }

      if (!convData || convData.length === 0) {
        setConversations([]);
        setLoadingConvs(false);
        return;
      }

      const clientIds = Array.from(new Set(convData.map((c) => c.client_id)));
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", clientIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.id, p.full_name || "Client"])
      );
      const clientMap = new Map(
        initialClients.map((c) => [c.id, { name: c.full_name || "Client", email: c.email }])
      );

      const enriched = await Promise.all(
        convData.map(async (conv) => {
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
            .eq("is_read", false);

          const clientInfo = clientMap.get(conv.client_id);
          const clientName = profileMap.get(conv.client_id) || clientInfo?.name || "Client";
          const clientEmail = clientInfo?.email || "";

          return {
            ...conv,
            client_name: clientName,
            client_email: clientEmail,
            last_message: msgs?.[0]?.content ?? "No messages yet",
            unread_count: count ?? 0,
          };
        })
      );

      setConversations(enriched);
      if (!activeConv && enriched.length > 0) {
        setActiveConv(enriched[0]);
      } else if (activeConv) {
        const updatedActive = enriched.find((c) => c.id === activeConv.id);
        if (updatedActive) setActiveConv(updatedActive);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingConvs(false);
    }
  }, [supabase, initialClients, activeConv]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const loadMessages = useCallback(
    async (convId: string) => {
      setLoadingMsgs(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data);
      }

      if (currentUserId) {
        await supabase
          .from("messages")
          .update({ is_read: true })
          .eq("conversation_id", convId)
          .neq("sender_id", currentUserId);
      }
      setLoadingMsgs(false);
    },
    [supabase, currentUserId]
  );

  useEffect(() => {
    if (activeConv) {
      loadMessages(activeConv.id);
    }
  }, [activeConv?.id, loadMessages]);

  useEffect(() => {
    if (!activeConv) return;

    const channel = supabase
      .channel(`admin-messages:${activeConv.id}`)
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
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          if (newMsg.sender_id !== currentUserId) {
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
  }, [activeConv?.id, currentUserId, supabase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const sendMessage = async () => {
    if (!activeConv || !currentUserId || sending) return;
    if (!input.trim() && !pendingFile) return;

    setSending(true);
    let fileUrl: string | null = null;
    let fileName: string | null = null;
    let fileSize: number | null = null;
    let msgType: "text" | "file" | "image" = "text";

    if (pendingFile) {
      setUploading(true);
      const ext = pendingFile.name.split(".").pop();
      const path = `admin/${activeConv.id}/${Date.now()}.${ext}`;
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
      sender_id: currentUserId,
      content: input.trim() || null,
      message_type: msgType,
      file_url: fileUrl,
      file_name: fileName,
      file_size: fileSize,
    });

    if (!error) {
      setInput("");
      setPendingFile(null);
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", activeConv.id);
    }
    setSending(false);
  };

  const toggleStatus = async () => {
    if (!activeConv) return;
    const newStatus = activeConv.status === "open" ? "closed" : "open";
    const { error } = await supabase
      .from("conversations")
      .update({ status: newStatus })
      .eq("id", activeConv.id);

    if (!error) {
      setActiveConv({ ...activeConv, status: newStatus });
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConv.id ? { ...c, status: newStatus } : c))
      );
    }
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId || !newSubject.trim() || !currentUserId) return;

    setCreatingThread(true);
    const { data: conv, error: convErr } = await supabase
      .from("conversations")
      .insert({
        client_id: selectedClientId,
        subject: newSubject.trim(),
        status: "open",
        last_message_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!convErr && conv) {
      if (newFirstMessage.trim()) {
        await supabase.from("messages").insert({
          conversation_id: conv.id,
          sender_id: currentUserId,
          content: newFirstMessage.trim(),
          message_type: "text",
        });
      }
      setShowNewModal(false);
      setSelectedClientId("");
      setNewSubject("");
      setNewFirstMessage("");
      await loadConversations();
      setActiveConv(conv);
    }
    setCreatingThread(false);
  };

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      (c.client_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (c.subject?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (c.last_message?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Messages & Communication
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time conversations and support tickets with all registered clients.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadConversations()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#6347FB] hover:bg-[#5235f1] transition-all shadow-sm"
          >
            <Plus size={16} /> New Message
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-210px)] min-h-[580px] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80">
        {/* LEFT COLUMN: Conversation List */}
        <div className="w-80 md:w-96 flex flex-col border-r border-slate-200 bg-slate-50/50 flex-shrink-0">
          <div className="p-3.5 border-b border-slate-200 bg-white space-y-2.5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search client or message..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5">
              {(["all", "open", "closed"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    statusFilter === status
                      ? "bg-[#0C1929] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loadingConvs ? (
              <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-2">
                <Loader2 size={22} className="animate-spin text-[#6347FB]" />
                <span className="text-xs">Loading conversations...</span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <MessageSquare size={32} className="mx-auto opacity-30 text-slate-400" />
                <p className="text-xs font-medium text-slate-600">No conversations found</p>
                <p className="text-[11px] text-slate-400">
                  {searchQuery ? "Try a different search term" : "Click New Message to start one"}
                </p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = activeConv?.id === conv.id;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConv(conv)}
                    className={`w-full text-left p-3.5 transition-all flex items-start gap-3 relative ${
                      isActive
                        ? "bg-white shadow-[inset_3px_0_0_#6347FB] border-l-transparent"
                        : "hover:bg-slate-100/60"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6347FB] to-[#9B8CFF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                      {conv.client_name?.slice(0, 2).toUpperCase() || "CL"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {conv.client_name}
                        </span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {formatTime(conv.last_message_at || conv.created_at)}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-slate-700 truncate">
                        {conv.subject}
                      </p>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[11px] text-slate-400 truncate max-w-[190px]">
                          {conv.last_message}
                        </p>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {conv.status === "closed" && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 font-medium">
                              Closed
                            </span>
                          )}
                          {(conv.unread_count || 0) > 0 && (
                            <span className="w-4 h-4 rounded-full bg-[#F56962] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6347FB] to-[#9B8CFF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {activeConv.client_name?.slice(0, 2).toUpperCase() || "CL"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900 truncate">
                      {activeConv.client_name}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        activeConv.status === "open"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      <Circle
                        size={6}
                        className={
                          activeConv.status === "open"
                            ? "fill-emerald-500 text-emerald-500"
                            : "fill-slate-400 text-slate-400"
                        }
                      />
                      {activeConv.status === "open" ? "Open Thread" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    Subject: <span className="font-medium text-slate-700">{activeConv.subject}</span>
                    {activeConv.client_email && (
                      <span className="ml-2 text-slate-400">({activeConv.client_email})</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleStatus}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    activeConv.status === "open"
                      ? "text-slate-600 bg-white border-slate-200 hover:bg-slate-50"
                      : "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {activeConv.status === "open" ? (
                    <>
                      <Archive size={14} /> Mark as Closed
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} /> Reopen Ticket
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/40">
              {loadingMsgs ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                  <Loader2 size={24} className="animate-spin text-[#6347FB]" />
                  <span className="text-xs">Loading messages...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
                  <MessageSquare size={36} className="opacity-30 text-slate-400" />
                  <p className="text-xs font-medium text-slate-600">No messages in this conversation yet</p>
                  <p className="text-[11px] text-slate-400">Send a reply below to reach out to the client.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.sender_id === currentUserId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                        <span className="font-semibold text-slate-600">
                          {isMe ? "Admin (You)" : activeConv.client_name}
                        </span>
                        <span>•</span>
                        <span>{formatTime(msg.created_at)}</span>
                      </div>

                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm text-xs leading-relaxed ${
                          isMe
                            ? "bg-[#0C1929] text-white rounded-tr-none"
                            : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none"
                        }`}
                      >
                        {msg.content && <p className="whitespace-pre-wrap">{msg.content}</p>}

                        {msg.file_url && (
                          <div
                            className={`mt-2 flex items-center gap-2 p-2 rounded-xl text-xs ${
                              isMe ? "bg-white/10 text-white" : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            {msg.message_type === "image" ? (
                              <ImageIcon size={16} />
                            ) : (
                              <FileText size={16} />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="truncate font-medium">{msg.file_name || "Attachment"}</p>
                              {msg.file_size && (
                                <p className="text-[10px] opacity-70">
                                  {formatFileSize(msg.file_size)}
                                </p>
                              )}
                            </div>
                            <a
                              href={msg.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className={`p-1 rounded hover:opacity-80 transition-opacity ${
                                isMe ? "text-white" : "text-slate-700"
                              }`}
                            >
                              <Download size={14} />
                            </a>
                          </div>
                        )}
                      </div>

                      {isMe && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                          {msg.is_read ? (
                            <span className="flex items-center gap-0.5 text-emerald-600 font-medium">
                              <CheckCheck size={12} /> Read
                            </span>
                          ) : (
                            <span className="flex items-center gap-0.5 text-slate-400">
                              <Check size={12} /> Delivered
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3.5 border-t border-slate-200 bg-white">
              {pendingFile && (
                <div className="mb-2 flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Paperclip size={14} className="text-slate-500" />
                    <span className="font-medium text-slate-700 truncate">
                      {pendingFile.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({formatFileSize(pendingFile.size)})
                    </span>
                  </div>
                  <button
                    onClick={() => setPendingFile(null)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setPendingFile(f);
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all flex-shrink-0"
                  title="Attach file"
                >
                  <Paperclip size={16} />
                </button>

                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your reply to client (Press Enter to send)..."
                  rows={1}
                  className="flex-1 max-h-28 py-2.5 px-3.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] resize-none transition-all"
                />

                <button
                  onClick={sendMessage}
                  disabled={sending || uploading || (!input.trim() && !pendingFile)}
                  className="px-4 py-2.5 rounded-xl bg-[#6347FB] hover:bg-[#5235f1] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0"
                >
                  {sending || uploading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <span>Send</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-3 bg-slate-50/30">
            <MessageSquare size={48} className="opacity-25" />
            <p className="text-sm font-semibold text-slate-600">Select a conversation</p>
            <p className="text-xs text-slate-400 max-w-sm text-center">
              Choose an active thread from the left or create a new message ticket for any client.
            </p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Start New Client Thread</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Client
                </label>
                <select
                  required
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB]"
                >
                  <option value="">-- Choose a registered client --</option>
                  {initialClients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.full_name || "Unnamed"} ({client.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Delivery Update, Contract Details..."
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Initial Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Type an opening note or greeting for the client..."
                  value={newFirstMessage}
                  onChange={(e) => setNewFirstMessage(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6347FB]/20 focus:border-[#6347FB] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingThread || !selectedClientId || !newSubject.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#6347FB] hover:bg-[#5235f1] disabled:opacity-50 transition-all shadow-sm flex items-center gap-2"
                >
                  {creatingThread && <Loader2 size={14} className="animate-spin" />}
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
