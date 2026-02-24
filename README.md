# Design Department Portfolio

## Overview
The **Design Department** portfolio is a **modern architecture and design studio website** built to showcase the firm's projects, services, and team. The platform features a **dynamic project gallery with Airtable CMS integration**, team profiles, service listings, and a community page — all wrapped in a sleek, responsive design.

---

## **Features**
### **For Visitors**
- **Hero Section**: Full-screen immersive hero with optimised background imagery.
- **Project Showcase**: Browse architectural projects pulled dynamically from **Airtable CMS** with individual project detail pages.
- **Service Overview**: Explore offerings including **Architectural Design, Design Management, Construction Documentation**, and **Contract Administration**.
- **Team Profiles**: Meet the managing partners and department heads across design, engineering, IT, and cost management.
- **Contact Section**: Reach out via phone, email, or visit the office in Accra, Ghana.

### **General Features**
- **Airtable CMS Integration**: Projects are managed through Airtable for easy content updates without code changes.
- **Responsive Design**: Fully responsive layout optimised for mobile, tablet, and desktop.
- **Smooth Animations**: Framer Motion-powered transitions and scroll interactions.
- **Community Page**: A dedicated space for community engagement and updates.
- **Dynamic Routing**: Individual project pages with slug-based routing.
- **Auto-hiding Header**: Smart header that hides on scroll-down and reappears on scroll-up.

---

## **Tech Stack**
- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Airtable (for project data)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## **Installation & Setup**
### **1. Clone the Repository**
```bash
git clone https://github.com/KwameO-a/Design-Department-Portfolio.git
cd Design-Department-Portfolio
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env.local` file in the root directory:
```env
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
```

### **4. Run the Development Server**
```bash
npm run dev
```
Visit `http://localhost:3000` to view the site.

---

## **Project Structure**
```
design-portfolio-website/
├── app/
│   ├── Community/        # Community page
│   ├── projects/         # Projects listing & dynamic [slug] pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact section
│   ├── ContentGrid.tsx   # Navigation content grid
│   ├── Footer.tsx        # Footer
│   ├── Header.tsx        # Auto-hiding header
│   ├── Hero.tsx          # Hero section
│   ├── Projects.tsx      # Projects section
│   ├── Services.tsx      # Services section
│   └── Team.tsx          # Team section
├── public/images/        # Static assets
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── package.json
```

---

## **Deployment**
The site is deployed on **Vercel**. Any push to the `main` branch triggers an automatic deployment.

```bash
npm run build
```
