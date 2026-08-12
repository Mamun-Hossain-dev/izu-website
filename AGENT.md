## CAVEMAN — less output token

Drop filler, articles, pleasantries, hedging.
Keep code blocks and technical terms exact.
Short sentences. Fragments OK.
No "I'd be happy to help." No "The reason this is happening is because."

## PONYTAIL — less code written

Before writing any code, check in order:

1. Does this need to exist? → no: skip it (YAGNI)
2. Stdlib does it? → use it
3. Native platform feature? → use it
4. Already installed dependency? → use it
5. One line? → one line
6. Only then: minimum that works

No new dependencies unless unavoidable.
No unrequested abstractions or boilerplate.
Deletion over addition.

## Project architecture

- Follow Next.js App Router conventions and current Next.js best practices.
- Keep every `page.tsx` a Server Component. Never add `"use client"` to a page.
- Move browser state, event handlers, form interactions, and hooks into focused Client Components.
- Prefer Server Components by default. Add `"use client"` only at the smallest interactive boundary.
- Build shared, reusable components for repeated layouts, fields, branding, buttons, and form patterns.
- Keep components focused and moderately sized. Avoid both oversized components and tiny one-purpose wrappers that add indirection without meaningful reuse.
- Group closely related UI and behavior in one cohesive component or module. Split only at a reusable boundary or when responsibilities clearly diverge.
- Keep route files thin: compose components, define route metadata, and fetch server data there.
- Use `next/image` for local images and `next/link` for internal navigation.
- Preserve accessibility: semantic HTML, associated labels, keyboard support, visible focus states, and useful autocomplete attributes.
- Keep responsive behavior intentional across mobile, tablet, and desktop sizes.
- Do not add dependencies when the platform or an installed package already solves the problem.
- Reuse existing design tokens and assets before creating new ones.
- Validate changes with TypeScript, lint, and production build when safe.
- Never execute or preserve obfuscated, unexplained, or suspicious code. Stop and clean or report it before running the project.
