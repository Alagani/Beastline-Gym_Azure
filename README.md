# Vj's Beastline Gym

Official landing page for **Vj's Beastline Gym** in Mangalam, Tirupati.

## Overview

React + Vite single-page website for a local gym with business info, membership plans, facilities, gallery, FAQ, contact/map, SEO, and a chatbot.

## Tech Stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS 4, Motion, Lucide React
- Azure Static Web Apps (hosting)
- Terraform (infrastructure)
- GitHub Actions (CI/CD)

---

## How Everything Works (Beginner Guide)

### The Big Picture

```
Your Code (GitHub)
    |
    v
GitHub Actions (CI/CD)
    |
    +---> App Pipeline   --> builds & deploys website
    +---> Terraform Pipeline --> manages Azure infrastructure
```

### What is Bootstrap?

Bootstrap is a **one-time setup**. Think of it like this:

- **Terraform** needs a place to save its state (like a save file for a game)
- That place is an **Azure Storage Account** (a container in the cloud)
- Bootstrap **creates that container** so Terraform can use it
- You run it **once**, then never touch it again

```
bootstrap/  --> run once locally --> creates storage account
    |
    v
main terraform/ --> uses that storage account --> manages your infra
```

### What is Terraform?

Terraform is **Infrastructure as Code**. Instead of clicking buttons in Azure Portal to create resources, you write code that does it. Your Terraform creates:

- A Resource Group (a folder for Azure resources)
- A Static Web App (where your website is hosted)

### What are the Pipelines?

Two separate GitHub Actions workflows:

#### 1. App Pipeline (`azure-static-web-apps.yml`)

Triggers when you push code changes:

```
Push to main
    |
    v
Install dependencies (npm ci)
    |
    v
Lint (check for errors)
    |
    v
Security audit (npm audit)
    |
    v
Build (create production files)
    |
    v
Deploy to Azure Static Web Apps
```

On Pull Requests: runs everything except deploy (so you can catch errors before merging).

#### 2. Terraform Pipeline (`terraform.yml`)

Triggers when you change files in `terraform/`:

```
Push terraform changes to main
    |
    v
terraform init (download providers)
    |
    v
terraform validate (check syntax)
    |
    v
terraform apply (create/update Azure resources)
```

On Pull Requests: runs `terraform plan` only (shows what would change, doesn't apply).

---

## Setup Guide (Step by Step)

### Step 1: Install Tools

```bash
# Node.js (for the app)
# Download from https://nodejs.org

# Azure CLI (for Azure login)
# Download from https://learn.microsoft.com/en-us/cli/azure/install-azure-cli

# Terraform (for infrastructure)
# Download from https://developer.hashicorp.com/terraform/install
```

### Step 2: Bootstrap (Run Once)

This creates the storage account where Terraform saves its state:

```bash
az login
cd terraform/bootstrap
terraform init
terraform apply
cd ../..
```

Type `yes` when prompted. This takes ~1 minute.

### Step 3: Initialize Main Terraform

```bash
cd terraform
terraform init -migrate-state
cd ..
```

This tells Terraform to use the remote storage account instead of a local file.

### Step 4: Create Azure Service Principal

This creates an identity that GitHub Actions uses to manage Azure:

```bash
az ad sp create-for-fid \
  --name "sp-beastline-terraform" \
  --role "Contributor" \
  --scopes "/subscriptions/YOUR_SUBSCRIPTION_ID"
```

Copy the output `appId` — this is your `AZURE_CLIENT_ID`.

### Step 5: Set Up Federated Credential

In Azure Portal:
1. Go to **Microsoft Entra ID** → **App registrations**
2. Click on **sp-beastline-terraform**
3. Go to **Certificates & secrets** → **Federated credentials**
4. Click **Add credential**
5. Set:
   - Issuer: `https://token.actions.githubusercontent.com`
   - Subject: `repo:Alagani/Beastline-Gym_Azure:ref:refs/heads/main`
   - Name: `github-main`
6. Click **Add**

### Step 6: Assign Permissions

In Azure Portal:
1. Go to **Subscriptions** → your subscription
2. **Access control (IAM)** → **Add role assignment**
3. Role: **Contributor**
4. Assign to: **sp-beastline-terraform**
5. Click **Review + assign**

### Step 7: Add GitHub Secrets

In GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Name | Where to find |
|------|---------------|
| `AZURE_CLIENT_ID` | App Registration → Overview → Application ID |
| `AZURE_TENANT_ID` | Microsoft Entra ID → Overview → Tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Subscriptions → Overview → Subscription ID |

### Step 8: Add Azure Static Web Apps Secret

In GitHub repo → **Settings** → **Secrets and variables** → **Actions**:

| Name | Where to find |
|------|---------------|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Azure Portal → Static Web App → Manage deployment token |
| `VITE_PHONE` | Your phone number (used in the app) |
| `VITE_BASE_URL` | Your API base URL (used in the app) |

### Step 9: Push and Deploy

```bash
git add .
git commit -m "initial setup"
git push
```

GitHub Actions will:
1. Build and deploy your website
2. Create/update Azure infrastructure via Terraform

---

## Project Structure

```
.
├── .github/workflows/
│   ├── azure-static-web-apps.yml  # App CI/CD pipeline
│   └── terraform.yml              # Infrastructure pipeline
├── src/                            # React app source code
├── public/                         # Static assets
├── terraform/
│   ├── bootstrap/                  # Run ONCE to create state backend
│   │   ├── main.tf
│   │   ├── providers.tf
│   │   ├── versions.tf
│   │   └── outputs.tf
│   ├── main.tf                     # Resource group + Static Web App
│   ├── backend.tf                  # Remote state config
│   ├── providers.tf                # Azure provider
│   ├── variables.tf                # Input variables
│   ├── outputs.tf                  # Output values
│   ├── versions.tf                 # Terraform version constraints
│   └── terraform.tfvars            # Your variable values (not committed)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── staticwebapp.config.json        # Azure SWA routing config
```

## Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`.

## Validation

```bash
npm run lint    # TypeScript type check
npm run build   # Production build to dist/
```

## SEO Features

- Title, description, keywords, robots meta tags
- Open Graph and Twitter metadata
- Local business JSON-LD schema
- `robots.txt`, `sitemap.xml`
- Google Search Console verification
