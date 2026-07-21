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

export async function getUsers(): Promise<User[]> {
  return readJson<User>("users");
}

export async function addUser(user: { email: string; name: string; id: string }) {
  const users = await getUsers();
  users.push({ ...user, createdAt: now() });
  await writeJson("users", users);
  return user;
}

export async function getDeposits(): Promise<Deposit[]> {
  return readJson<Deposit>("deposits");
}

export async function addDeposit(deposit: { userId: string; amount: number; id: string; status: string }) {
  const deposits = await getDeposits();
  deposits.push({ ...deposit, createdAt: now() });
  await writeJson("deposits", deposits);
  return deposit;
}

export async function getEvents(): Promise<Event[]> {
  return readJson<Event>("events");
}

export async function addEvent(event: Omit<Event, "id" | "createdAt">) {
  const events = await getEvents();
  events.push({ ...event, id: uuid(), createdAt: now() });
  await writeJson("events", events);
  return event;
}

export async function getStats() {
  const events = await getEvents();
  const users = await getUsers();
  const deposits = await getDeposits();

  const signUps = users.length;
  const signUpEvents = events.filter((e) => e.type === "signup").length;
  const depositEvents = deposits.filter((d) => d.status === "completed").length;
  const totalDeposits = deposits
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);
  const buttonClicks = events.filter((e) => e.type === "button_click").length;
  const conversions = events.filter((e) => e.type === "conversion").length;

  return {
    signUps: Math.max(signUps, signUpEvents),
    depositEvents,
    totalDeposits,
    buttonClicks,
    conversions,
  };
}
