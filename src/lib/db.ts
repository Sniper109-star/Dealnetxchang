import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");

function uuid() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Event {
  id: string;
  userId?: string;
  type: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Deposit {
  id: string;
  userId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  createdAt: string;
}

export interface Kyc {
  id: string;
  userId: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  totalValue: number;
  availableBalance: number;
  investedBalance: number;
  profitLoss: number;
  updatedAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  createdAt: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
}

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T[] = []): Promise<T[]> {
  try {
    const content = await fs.readFile(path.join(DATA_DIR, `${file}.json`), "utf-8");
    return JSON.parse(content) as T[];
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown[]) {
  await ensureDir();
  await fs.writeFile(
    path.join(DATA_DIR, `${file}.json`),
    JSON.stringify(data, null, 2)
  );
}

// Users
export async function getUsers(): Promise<User[]> {
  return readJson<User>("users");
}

export async function addUser(user: { email: string; name: string; password: string; role?: "user" | "admin"; id: string }) {
  const users = await getUsers();
  users.push({ ...user, role: user.role ?? "user", createdAt: now() });
  await writeJson("users", users);
  return user;
}

export async function updateUser(id: string, updates: Partial<User>) {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  await writeJson("users", users);
  return users[index];
}

// Events
export async function getEvents(): Promise<Event[]> {
  return readJson<Event>("events");
}

export async function addEvent(event: Omit<Event, "id" | "createdAt">) {
  const events = await getEvents();
  events.push({ ...event, id: uuid(), createdAt: now() });
  await writeJson("events", events);
  return event;
}

// Deposits
export async function getDeposits(): Promise<Deposit[]> {
  return readJson<Deposit>("deposits");
}

export async function addDeposit(deposit: { userId: string; amount: number; id: string; status: string }) {
  const deposits = await getDeposits();
  deposits.push({ ...deposit, createdAt: now() });
  await writeJson("deposits", deposits);
  return deposit;
}

export async function updateDeposit(id: string, updates: Partial<Deposit>) {
  const deposits = await getDeposits();
  const index = deposits.findIndex((d) => d.id === id);
  if (index === -1) return null;
  deposits[index] = { ...deposits[index], ...updates };
  await writeJson("deposits", deposits);
  return deposits[index];
}

// Withdrawals
export async function getWithdrawals(): Promise<Withdrawal[]> {
  return readJson<Withdrawal>("withdrawals");
}

export async function addWithdrawal(withdrawal: { userId: string; amount: number; id: string; status: "pending" | "approved" | "rejected" | "completed" }) {
  const withdrawals = await getWithdrawals();
  withdrawals.push({ ...withdrawal, createdAt: now() });
  await writeJson("withdrawals", withdrawals);
  return withdrawal;
}

export async function updateWithdrawal(id: string, updates: Partial<Withdrawal>) {
  const withdrawals = await getWithdrawals();
  const index = withdrawals.findIndex((w) => w.id === id);
  if (index === -1) return null;
  withdrawals[index] = { ...withdrawals[index], ...updates };
  await writeJson("withdrawals", withdrawals);
  return withdrawals[index];
}

// KYC
export async function getKycs(): Promise<Kyc[]> {
  return readJson<Kyc>("kycs");
}

export async function addKyc(kyc: { userId: string; fullName: string; documentType: string; documentNumber: string; id: string; status: "pending" | "approved" | "rejected" }) {
  const kycs = await getKycs();
  kycs.push({ ...kyc, submittedAt: now() });
  await writeJson("kycs", kycs);
  return kyc;
}

export async function updateKyc(id: string, updates: Partial<Kyc>) {
  const kycs = await getKycs();
  const index = kycs.findIndex((k) => k.id === id);
  if (index === -1) return null;
  kycs[index] = { ...kycs[index], ...updates };
  await writeJson("kycs", kycs);
  return kycs[index];
}

// Portfolio
export async function getPortfolios(): Promise<Portfolio[]> {
  return readJson<Portfolio>("portfolios");
}

export async function getPortfolioByUserId(userId: string): Promise<Portfolio | undefined> {
  const portfolios = await getPortfolios();
  return portfolios.find((p) => p.userId === userId);
}

export async function upsertPortfolio(portfolio: { userId: string; totalValue: number; availableBalance: number; investedBalance: number; profitLoss: number }) {
  const portfolios = await getPortfolios();
  const existing = portfolios.find((p) => p.userId === portfolio.userId);
  if (existing) {
    const index = portfolios.indexOf(existing);
    portfolios[index] = { ...portfolios[index], ...portfolio, updatedAt: now() };
  } else {
    portfolios.push({ ...portfolio, id: uuid(), updatedAt: now() });
  }
  await writeJson("portfolios", portfolios);
  return portfolio;
}

// Investments
export async function getInvestments(): Promise<Investment[]> {
  return readJson<Investment>("investments");
}

export async function getInvestmentsByUserId(userId: string): Promise<Investment[]> {
  const investments = await getInvestments();
  return investments.filter((i) => i.userId === userId);
}

export async function addInvestment(investment: { userId: string; symbol: string; name: string; quantity: number; buyPrice: number; currentPrice: number; id: string }) {
  const investments = await getInvestments();
  investments.push({ ...investment, createdAt: now() });
  await writeJson("investments", investments);
  return investment;
}

// Settings
export async function getSettings(): Promise<Setting[]> {
  return readJson<Setting>("settings");
}

export async function getSetting(key: string): Promise<Setting | undefined> {
  const settings = await getSettings();
  return settings.find((s) => s.key === key);
}

export async function setSetting(key: string, value: string) {
  const settings = await getSettings();
  const existing = settings.find((s) => s.key === key);
  if (existing) {
    const index = settings.indexOf(existing);
    settings[index] = { ...settings[index], value };
  } else {
    settings.push({ id: uuid(), key, value });
  }
  await writeJson("settings", settings);
  return { key, value };
}

// Stats
export async function getStats() {
  const events = await getEvents();
  const users = await getUsers();
  const deposits = await getDeposits();
  const withdrawals = await getWithdrawals();
  const kycs = await getKycs();

  const signUps = users.length;
  const depositEvents = deposits.filter((d) => d.status === "completed").length;
  const totalDeposits = deposits
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);
  const withdrawalEvents = withdrawals.filter((w) => w.status === "completed").length;
  const totalWithdrawals = withdrawals
    .filter((w) => w.status === "completed")
    .reduce((sum, w) => sum + w.amount, 0);
  const buttonClicks = events.filter((e) => e.type === "button_click").length;
  const conversions = events.filter((e) => e.type === "conversion").length;
  const pendingKycs = kycs.filter((k) => k.status === "pending").length;

  return {
    signUps,
    depositEvents,
    totalDeposits,
    withdrawalEvents,
    totalWithdrawals,
    buttonClicks,
    conversions,
    pendingKycs,
  };
}
