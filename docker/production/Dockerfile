# Base image with Node.js
FROM node:18-alpine AS base

# Install necessary system dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    libc6-compat \
    cairo-dev \
    pango-dev \
    giflib-dev \
    make \
    g++ \
    bash

WORKDIR /usr/src/kiosk  # Ensure consistent working directory

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /usr/src/kiosk

RUN mkdir -p /usr/src/kiosk/node_modules

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Fix Husky (optional)
RUN if [ -d ".husky" ]; then yarn husky install || true; fi

# Stage 2: Build application
FROM base AS builder
WORKDIR /usr/src/kiosk

# Copy dependencies from the deps stage
COPY --from=deps /usr/src/kiosk/node_modules ./node_modules

# Copy application source code
COPY . .

# Ensure Next.js is installed
RUN yarn build

# Debug: Check if standalone output exists
RUN ls -la .next && ls -la .next/static && ls -la .next/standalone || echo "Build output missing!"

# Stage 3: Production image
FROM base AS runner
WORKDIR /usr/src/kiosk

# Add a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ensure required directories exist
RUN mkdir -p ./public ./.next/static

# Copy public assets safely
COPY --from=builder /usr/src/kiosk/public ./public

# Copy Next.js build output safely
COPY --from=builder --chown=nextjs:nodejs /usr/src/kiosk/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/kiosk/.next/static ./.next/static
