# 🚀 Portfolio 2.0 — Engineered to Grow With Me

A modern, full-stack developer portfolio built with **Next.js 16, React 19, TypeScript, Tailwind CSS, Sanity CMS, and GSAP**.

Portfolio 2.0 goes beyond a traditional portfolio website. It is a dynamic, content-driven platform designed to evolve alongside my skills, projects, and experience. With a CMS-powered workflow and dynamic content management, updates can be published without modifying application code or redeploying the website for routine content changes.

**Build once. Manage dynamically. Evolve continuously.**

---

## ✨ Features

### 🎨 Interactive UI & Experience

- Smooth GSAP animations powered by Lenis Smooth Scroll.
- Interactive cursor effects and engaging micro-interactions.
- Seamless dark mode and theme switching.
- Responsive layouts optimized for desktop, tablet, and mobile.
- Modern visual design with fluid transitions.
- Performance optimization with Next.js 16.

### ⚙️ Dynamic Content Management

- Create, update, and manage portfolio projects.
- Manage project galleries and visual media.
- Dynamically manage pages and website navigation.
- Update content without modifying frontend code.
- Publish content changes without routine application redeployments.
- Keep portfolio content synchronized across relevant sections.

### 🛠️ Admin Dashboard & Automation

- Centralized content management workflows.
- Manage projects, galleries, pages, and navigation.
- Handle contact form submissions through custom REST endpoints.
- Streamline administrative workflows and content updates.

### 🚀 Performance & Architecture

- Next.js App Router architecture.
- Type-safe development with TypeScript.
- Reusable and maintainable UI components.
- Custom REST API endpoints for projects, pages, and contact submissions.
- Scalable architecture designed for future enhancements.
- Performance-conscious rendering and user experience.

---

## 🧰 Tech Stack

| Technology       | Purpose                                     |
| ---------------- | ------------------------------------------- |
| Next.js 16       | Full-stack React framework                  |
| React 19         | Component-based UI                          |
| TypeScript       | Type safety and maintainability             |
| Tailwind CSS     | Responsive styling                          |
| Sanity CMS       | Structured content management               |
| GSAP             | Advanced animations and scroll interactions |
| App Router       | Routing, layouts, and application structure |
| Custom REST APIs | Projects, pages, and contact submissions    |

---

## 🏗️ Architecture Overview

Portfolio 2.0 separates the presentation layer from content management and application logic.

```text
Portfolio 2.0
│
├── Frontend
│   ├── Next.js 16
│   ├── React 19
│   ├── TypeScript
│   ├── Tailwind CSS
│   └── GSAP Animations
│
├── Content Management
│   └── Sanity CMS
│       ├── Projects
│       ├── Galleries
│       ├── Pages
│       └── Navigation
│
└── API Layer
    ├── Project Endpoints
    ├── Page Endpoints
    └── Contact Form Submissions
```

### Content Workflow

1. Create or update content through the configured CMS or management interface.
2. Retrieve content through the application's data layer.
3. Render updated content across the relevant portfolio sections.
4. Publish changes without routine application redeployments when the configured caching and revalidation workflow supports it.

---

## 🎯 Project Goals

- **Dynamic by design:** Manage content without hardcoding every update.
- **Built to scale:** Maintain a flexible and extensible architecture.
- **Performance focused:** Deliver a smooth and responsive browsing experience.
- **Interaction driven:** Combine animation, motion, and usability.
- **Automation oriented:** Reduce repetitive content-management tasks.
- **Production minded:** Apply practical engineering principles to a real-world application.

---

## 🧩 Sanity CMS Setup

Portfolio 2.0 uses [Sanity](https://www.sanity.io/) as its headless CMS to manage projects, pages, navigation, site settings, and other portfolio content.

Follow these steps to configure Sanity and enable automatic content revalidation.

### 1. Create a Sanity Account

1. Visit [Sanity](https://www.sanity.io/).
2. Sign up or log in.
3. Open the [Sanity Management Dashboard](https://www.sanity.io/manage).
4. Create a new project for Portfolio 2.0.
5. Choose a project name and configure a dataset, such as `production`.

Keep your Sanity project ID and dataset name available for the next steps.

### 2. Configure Sanity Studio

Open the Sanity configuration in `apps/studio`.

Update your Sanity project configuration with the correct project ID and dataset.

Example environment configuration for the web application:

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

Replace the example values with the values used by your project.

> **Note:** The API version above is an example. Use the version configured by your application. Environment variable names must match your actual Sanity client configuration.

### 3. Create a Sanity API Token

If your application needs authenticated access to private content or other protected Sanity API operations, create an API token.

1. Open [Sanity Manage](https://www.sanity.io/manage).
2. Select your Portfolio 2.0 project.
3. Navigate to **API → Tokens**.
4. Create a new token.
5. Assign only the permissions required by your application.
6. Copy the token and store it securely.

If your website reads only publicly accessible published content, an API token may not be necessary.

For server-side authenticated access, add the token to the appropriate environment file, for example:

```env
SANITY_API_TOKEN=your_private_api_token
```

Use this variable only if your application expects it. Never expose private tokens through `NEXT_PUBLIC_` variables or commit them to Git.

### 4. Configure the Revalidation Secret

The webhook secret protects your revalidation endpoint from unauthorized requests.

Generate a strong random secret. For example, with OpenSSL:

```bash
openssl rand -base64 32
```

Add the generated value to `apps/web/.env.local`:

```env
SANITY_REVALIDATE_SECRET=your_generated_secret
```

Configure the same secret in your Sanity webhook settings or configure a custom HTTP header, depending on how your revalidation API route validates incoming requests.

For production, add the secret to your hosting provider's environment variables as well.

**Important:** The receiving API route must validate the incoming webhook. Merely adding a secret in Sanity does not secure an endpoint unless the application verifies it.

### 5. Create a Sanity Webhook

A Sanity webhook notifies your Next.js application when relevant content changes. The application can then invalidate its cache and display updated content without requiring a new deployment.

1. Open [Sanity Manage](https://www.sanity.io/manage).
2. Select your project.
3. Navigate to **API → Webhooks**.
4. Click **Create webhook**.
5. Configure the webhook using the settings below.

#### Webhook Configuration

| Setting     | Value                                           |
| ----------- | ----------------------------------------------- |
| Name        | Portfolio Content Revalidation                  |
| URL         | `https://YOUR_DOMAIN/api/revalidate`            |
| Dataset     | `production`                                    |
| Trigger on  | Create, Update, Delete                          |
| HTTP method | POST                                            |
| API version | Use the version supported by your configuration |
| Enabled     | Yes                                             |

Replace `YOUR_DOMAIN` with your actual production domain.

For local testing, expose your local application through a secure public development tunnel. Sanity cannot call a private `localhost` URL directly.

#### Filter

Use the following GROQ filter to exclude drafts and limit revalidation to the document types used by the portfolio:

```groq
!(_id in path("drafts.**")) &&
_type in ["page", "project", "navigation", "siteSettings"]
```

This filter excludes draft document IDs and limits webhook events to pages, projects, navigation, and site settings.

Make sure these document types match the schemas in your Sanity Studio.

#### Projection

Configure the webhook projection as follows:

```groq
{
  _type,
  _id,
  "slug": slug.current
}
```

This sends the document type, document ID, and current slug in the webhook payload.

If some document types do not have a `slug` field, the projected slug will be absent or null for those documents.

#### HTTP Headers

If your Next.js revalidation endpoint expects a custom header, configure:

| Header             | Value                         |
| ------------------ | ----------------------------- |
| `x-webhook-secret` | Your generated webhook secret |

The header value must match the secret expected by the API route.

**Security note:** A custom `x-webhook-secret` header is different from Sanity's built-in webhook signing secret. Use the authentication method implemented by your revalidation endpoint. Do not assume that setting a custom header automatically enables signature verification.

#### Save and Enable

1. Review the webhook configuration.
2. Enable the webhook.
3. Save the configuration.
4. Use the webhook's test functionality, if available, to verify delivery.
5. Check your Next.js server logs and Sanity webhook delivery logs for errors.

### 6. Configure the Next.js Revalidation Endpoint

The webhook URL must point to a real API route in the web application.

For the App Router, the endpoint corresponding to:

`https://YOUR_DOMAIN/api/revalidate`

is typically implemented at:

```text
apps/web/app/api/revalidate/route.ts
```

The route should:

- Accept POST requests.
- Validate the webhook secret or signature.
- Parse and validate the incoming payload.
- Revalidate the appropriate paths or cache tags.
- Return an appropriate HTTP response.
- Handle invalid requests and errors safely.

The implementation must match the chosen revalidation strategy. The webhook configuration alone does not implement cache invalidation.

See the [official Sanity Next.js revalidation guide](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs) for implementation details.

### 7. Configure Production Environment Variables

Add the required variables to your hosting provider, such as Vercel.

Typical variables include:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=your_configured_api_version
SANITY_REVALIDATE_SECRET=your_generated_secret
```

Add `SANITY_API_TOKEN` only if your application requires an authenticated read token.

After updating production environment variables, redeploy the application if your hosting platform requires it.

### 8. Test Automatic Revalidation

After configuration:

1. Open Sanity Studio.
2. Create or update a published project.
3. Publish the changes.
4. Confirm that Sanity sends the webhook.
5. Verify that the Next.js endpoint accepts the request.
6. Open the portfolio website and confirm that the updated content appears.

Also test updates to pages, navigation, and site settings.

Remember that revalidation only affects the cache paths or tags your application actually uses. Verify the implementation for each document type.

---

## 💻 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js:** A version compatible with your project's Next.js version.
- **pnpm:** Package manager used by this monorepo.
- **Sanity account:** Required for CMS configuration.
- **Environment variables:** Required for the web application and Sanity Studio.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd portfolio-2.0
```

Replace `<your-repository-url>` with your GitHub repository URL.

### 2. Install Dependencies

Install pnpm if it isn't already available:

```bash
npm install -g pnpm
```

Install the monorepo dependencies from the root directory:

```bash
pnpm install
```

### 3. Configure Environment Variables

Create local environment files for the applications that require them.

**Web application (`apps/web/.env.local`):**

```env
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_APP_DESCRIPTION=
NEXT_PUBLIC_APP_URL=

NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=

NEXT_PUBLIC_SENTRY_DSN=
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=

SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

**Sanity Studio (`apps/studio/.env.local`):**

Configure the environment variables required by your Sanity Studio setup.

```env
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=
```

Replace the placeholders with the values for your project. Ensure that variable names match those referenced in your application and Sanity configuration.

**Security considerations:**

- Never commit `.env.local` files or other files containing real secrets.
- Never expose private API tokens, Sentry authentication tokens, or privileged credentials through `NEXT_PUBLIC_` variables.
- Only configure tokens and secrets required by your implementation.
- Add the necessary environment variables to your deployment platform before deploying.

### 4. Start the Development Servers

From the repository root, install dependencies and start the applications using pnpm.

**Install dependencies**

```bash
pnpm install
```

These commands assume the workspace packages are named `web` and `studio` in their respective `package.json` files. If the package names differ, replace them with the configured names.

### 5. Build for Production

Run the production build from the repository root:

```bash
pnpm build
```

To build an individual application:

```bash
pnpm --filter @portfolio/web build
pnpm --filter  @portfolio/studio build
```

Ensure the relevant build scripts are defined in each application's `package.json`.

### 6. Run Sanity Studio

Start Sanity Studio using its configured development script:

```bash
pnpm --filter @portfolio/studio dev
```

The application will typically be available at:

[http://localhost:3333](http://localhost:3333)

### 7. Run the Production Application

Start the production web application using the script configured in `apps/web/package.json`.

Start the application using its configured development script:

```bash
pnpm --filter @portfolio/web start
```

The application will typically be available at:

[http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

This project uses a monorepo architecture managed with pnpm workspaces and Turborepo.

```text
portfolio-2.0/
├── apps/
│   ├── studio/                 # Sanity Studio CMS
│   │   ├── schemaTypes/        # Content schemas
│   │   ├── static/             # Static assets
│   │   ├── sanity.config.ts    # Sanity configuration
│   │   ├── sanity.cli.ts       # Sanity CLI configuration
│   │   └── package.json
│   │
│   └── web/                    # Next.js portfolio website
│       ├── app/                # App Router pages and layouts
│       ├── components/         # Reusable UI components
│       ├── constants/          # Application constants
│       ├── context/            # React context providers
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Utilities and integrations
│       ├── types/              # TypeScript definitions
│       ├── public/             # Static assets, if configured here
│       ├── next.config.ts      # Next.js configuration
│       └── package.json
│
├── packages/                   # Shared workspace packages
├── .gitignore                  # Git ignore rules
├── eslint.config.js            # ESLint configuration
├── package.json                # Root scripts and dependencies
├── pnpm-lock.yaml              # Dependency lockfile
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── tsconfig.base.json          # Shared TypeScript configuration
├── turbo.json                  # Turborepo task configuration
├── LICENSE                     # MIT License
└── README.md                   # Project documentation
```

### Monorepo Applications

- **Web (`apps/web`):** The Next.js portfolio website, including pages, components, animations, and application logic.
- **Studio (`apps/studio`):** Sanity Studio for managing portfolio content.
- **Packages (`packages/`):** Shared libraries and reusable code across workspace applications.
- **Turborepo:** Coordinates development, build, and other configured workspace tasks.
- **pnpm Workspaces:** Manages dependencies across the monorepo.

---

## 🔌 Core Functionality

### Projects & Galleries

Manage projects and associated media dynamically, making it easier to showcase new work without manually updating individual page components.

### Pages & Navigation

Manage website content and navigation through the configured content-management workflow.

### Contact Form

Custom REST endpoints support contact form submissions and related processing workflows.

Production deployments should include input validation, spam protection, rate limiting, and secure error handling.

### Animations & Smooth Scrolling

GSAP powers interactive experiences, including scroll-driven animations, transitions, and micro-interactions.

---

## 🔐 Security & Best Practices

- Keep private credentials out of version control.
- Validate and sanitize incoming API data.
- Protect contact endpoints against spam and abuse.
- Restrict administrative operations to authorized users.
- Configure environment variables securely.
- Review CMS permissions and access policies.
- Verify caching and content revalidation after publishing updates.

---

## 🚀 Deployment

Deploy the application to a compatible Next.js hosting platform, such as [Vercel](https://vercel.com/).

### Deployment Checklist

1. Push the application to your Git repository.
2. Configure production environment variables.
3. Connect and verify your Sanity project.
4. Deploy the application.
5. Test dynamic pages, projects, navigation, and contact submissions.
6. Verify content publishing and cache revalidation.
7. Test responsive layouts, animations, and theme switching.

Routine CMS updates should not require a new application deployment when the content delivery and revalidation workflows are configured accordingly.

---

## 🔮 Future Enhancements

- Advanced project filtering and search.
- Detailed project case studies.
- Analytics and engagement insights.
- Improved accessibility and reduced-motion support.
- Automated testing and continuous integration.
- Enhanced SEO and structured metadata.
- Content previews and publishing workflows.
- Expanded dashboard capabilities.

---

## 💡 Engineering Philosophy

This project reflects my approach to modern web development:

- Build reusable systems rather than one-off pages.
- Separate content management from presentation.
- Automate repetitive workflows wherever practical.
- Balance visual creativity with performance and accessibility.
- Design for maintainability and long-term growth.

A portfolio should be more than a collection of projects. It should demonstrate the thinking, architecture, and engineering principles behind the work.

---

## 👨‍💻 About

**Portfolio 2.0** is a personal full-stack project built to showcase my development experience, technical capabilities, and approach to building modern web applications.

It combines dynamic content management, interactive frontend experiences, animations, and scalable application architecture in one continuously evolving platform.

**Build once. Manage dynamically. Evolve continuously.**

---

## 🎨 Design Inspiration & Credits

The design and visual direction of this portfolio were inspired by [Dennis Janssen](https://dennissnellenberg.com).

This project is my own implementation, built with Next.js, React, TypeScript, Tailwind CSS, Sanity CMS, and GSAP, with custom functionality and adaptations to suit my personal portfolio.

Credit and appreciation to the original creator for the inspiration.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, React, TypeScript, Sanity CMS, and GSAP.**
