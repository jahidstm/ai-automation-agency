// ============================================================
// CORE TYPES — Used across the entire application
// ============================================================

export type UserRole = "super_admin" | "admin" | "project_manager" | "developer" | "client";

export type OrderStatus = "pending" | "in_progress" | "review" | "completed" | "cancelled";

export type MilestoneStatus = "pending" | "in_progress" | "completed";

export type InvoiceStatus = "draft" | "pending" | "paid" | "overdue" | "cancelled";

export type MessageSender = "client" | "agency";

// -------- User / Profile --------
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  avatar_url?: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

// -------- Order / Project --------
export interface Order {
  id: string;
  client_id: string;
  title: string;
  description: string;
  service_type: "chatbot" | "automation" | "data_pipeline" | "custom";
  status: OrderStatus;
  price: number;
  currency: string;
  deadline: string;
  assigned_to?: string;
  loom_url?: string;
  created_at: string;
  updated_at: string;
  milestones?: Milestone[];
  client?: Profile;
}

// -------- Milestone --------
export interface Milestone {
  id: string;
  order_id: string;
  title: string;
  description?: string;
  status: MilestoneStatus;
  due_date?: string;
  completed_at?: string;
  sort_order: number;
}

// -------- Message --------
export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  sender_role: MessageSender;
  content: string;
  file_url?: string;
  file_name?: string;
  file_type?: string;
  read_at?: string;
  created_at: string;
  sender?: Profile;
}

// -------- Invoice --------
export interface Invoice {
  id: string;
  order_id: string;
  client_id: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  due_date: string;
  stripe_payment_intent_id?: string;
  stripe_checkout_session_id?: string;
  paid_at?: string;
  created_at: string;
  order?: Order;
  client?: Profile;
}

// -------- File --------
export interface ProjectFile {
  id: string;
  order_id: string;
  uploaded_by: string;
  name: string;
  url: string;
  size: number;
  mime_type: string;
  category: "contract" | "credential" | "deliverable" | "asset" | "video" | "other";
  created_at: string;
}

// -------- Notification --------
export interface Notification {
  id: string;
  user_id: string;
  type: "message" | "milestone" | "payment" | "file" | "review";
  title: string;
  body: string;
  link?: string;
  read: boolean;
  created_at: string;
}

// -------- Lead / CRM --------
export type LeadStage = "prospect" | "contacted" | "call_booked" | "proposal_sent" | "won" | "lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  source: "apollo" | "linkedin" | "upwork" | "referral" | "website" | "other";
  stage: LeadStage;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// -------- Team Member --------
export interface TeamMember {
  id: string;
  user_id: string;
  role: UserRole;
  invited_by: string;
  joined_at: string;
  profile?: Profile;
}
