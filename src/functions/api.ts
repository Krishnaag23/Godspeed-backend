import { GSContext } from "@godspeedsystems/core";

// In-memory user store for demo
const users: any = {};

export async function getTeam(ctx: GSContext) {
  return {
    data: [
      {
        name: "Arun Singh",
        role: "Engineering Leadership, SRE & DevOps",
        img: "https://randomuser.me/api/portraits/men/11.jpg",
        bio: "Engineering leader with expertise in SRE, DevOps, and platform engineering.",
        socials: { linkedin: "https://www.linkedin.com/in/arun-singh/" },
      },
      // ...other team members
    ],
    code: 200,
    success: true,
  };
}

export async function getProduct(ctx: GSContext) {
  return {
    data: [
      { title: "Blazing Fast", desc: "Experience unmatched speed and reliability." },
      // ...more features
    ],
    code: 200,
    success: true,
  };
}

export async function getPricing(ctx: GSContext) {
  return {
    data: [
      { name: "Starter", price: "$19/mo", features: ["All core features", "Email support", "1 user"] },
      // ...more plans
    ],
    code: 200,
    success: true,
  };
}

export async function postContact(ctx: GSContext) {
  const { name, email, message } = ctx.inputs.data.body as { name: string; email: string; message: string };
  return {
    data: { success: true, message: "Thank you for contacting us!" },
    code: 200,
    success: true,
  };
}

export async function register(ctx: GSContext) {
  const { name, email, password } = ctx.inputs.data.body as { name: string; email: string; password: string };
  if (users[email]) {
    return { data: { success: false, message: "User already exists." }, code: 400, success: false };
  }
  users[email] = { name, email, password };
  return { data: { success: true, message: "Registration successful!" }, code: 200, success: true };
}

export async function login(ctx: GSContext) {
  const { email, password } = ctx.inputs.data.body as { email: string; password: string };
  const user = users[email];
  if (!user || user.password !== password) {
    return { data: { success: false, message: "Invalid credentials." }, code: 401, success: false };
  }
  return { data: { success: true, message: "Login successful!", user: { name: user.name, email: user.email } }, code: 200, success: true };
}
