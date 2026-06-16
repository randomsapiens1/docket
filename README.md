# docket.bd (pathway)

**docket.bd** is a modern platform designed to simplify Bangladesh government bureaucracy. It provides verified, step-by-step guidance for official processes—from company registration to land transfers—helping citizens and founders navigate complex procedures without needing expensive intermediaries.

## 🚀 Vision

Bangladesh's bureaucracy shouldn't be a barrier to progress. docket.bd translates complex bureaucratic jargon into clear, actionable steps, ensuring everyone has access to accurate information, official fees, and direct links to government portals.

## ✨ Key Features

- **Verified Checklists:** Every step is sourced directly from official government sources (RJSC, NBR, Gazette notifications).
- **Accurate Fee Calculation:** Real-time fee structures calculated from official documents, including discount eligibility.
- **Plain Language Guidance:** Jargon-free instructions that anyone can follow.
- **Business Matchmaker:** Intelligent tool to help founders find the right legal structure in 30 seconds.
- **Document Vault:** Secure, encrypted storage for NIDs, TINs, and other official papers, integrated with the registration pathway.
- **Progress Tracking:** Interactive checklists that sync with your vault to auto-complete requirements.

## 📂 Case Study: Streamlining Company Registration

### The Challenge
Starting a private limited company in Bangladesh typically involves navigating three different government portals (RJSC, NBR, City Corporation), managing dozens of physical documents, and understanding complex legal terms. Most founders resort to expensive "middlemen" due to the high risk of rejection from minor errors.

### The Solution: docket
We developed an end-to-end "Pathway" that guides the user from the very first step—Name Clearance—to final VAT registration.

1.  **Architecture:** Built on **Next.js 15+** for speed and SEO, utilizing a **Service Hub Pattern** where each guide acts as a mini-application.
2.  **The Matchmaker:** A logic-based quiz that determines if a user needs a Sole Proprietorship, Partnership, or Private Limited Company based on their goals and liability tolerance.
3.  **The Vault:** Using **Supabase Auth & Storage**, we created a secure environment where users can upload their NIDs once and have them automatically "checked off" in every service pathway they start.
4.  **UI/UX Strategy:** Adhered to a "Borders over Shadows" design language—using bold black borders and Docket Red (#ff0000) to create a trustworthy, "official yet modern" feel.

### Technical Hardening
During the implementation, we focused on "Security First" and "Zero Regressions":
-   **Security Headers:** Implemented X-Frame-Options, CSP, and Permissions-Policy to protect user data.
-   **Validation:** Robust client and server-side validation for file uploads (size, MIME-type, and UUID-based naming).
-   **Performance:** Optimized for the App Router with async cookie handling and lazy-loaded components to ensure fast load times on mobile networks.

## 🛠 Tech Stack

- **Framework:** [Next.js 15.2+](https://nextjs.org/) (App Router)
- **Backend/Auth:** [Supabase](https://supabase.com/) (Auth, Postgres, Storage)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## 🏗 Project Structure

```text
├── app/              # Next.js App Router (pages and layouts)
│   ├── auth/         # Supabase Authentication flow
│   ├── vault/        # Document management system
│   └── services/     # Interactive service pathways
├── components/       # React components
│   ├── calculators/  # Business Matchmaker & Fee tools
│   ├── landing/      # Landing page specific components
│   └── ui/           # Shared UI components (Shadcn)
├── lib/              # Utility functions and Supabase clients
├── public/           # Static assets (WebP optimized)
└── package.json      # Project dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) project (see `SQL_SETUP.md` for table definitions)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/randomsapiens1/docket.git
   cd pathway
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Copy `.env.example` to `.env.local` and add your Supabase credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is private and intended for the development of docket.bd.

---

Built with ❤️ in Bangladesh for Bangladeshis.
