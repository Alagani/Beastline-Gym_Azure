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





Objective
- Set up production-level GitHub Actions CI/CD pipelines for a React+Vite website deployed to Azure Static Web Apps, with Terraform managing Azure infrastructure, all following best practices.
Important Details
- Repo: Alagani/Beastline-Gym_Azure on GitHub
- App: React 19 + Vite 6 + TypeScript + Tailwind CSS 4 SPA for a gym
- Hosting: Azure Static Web Apps (Free tier)
- Infra: Terraform managing Azure Resource Group + Static Web App
- State backend: Azure Blob Storage (rg-terraform-state / sttfstatebl / tfstate)
- Two isolated pipelines: app files trigger app pipeline, terraform files trigger terraform pipeline
- OIDC auth for Terraform (no long-lived secrets) — requires AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_SUBSCRIPTION_ID in GitHub secrets
- Federated credential subject: repo:Alagani/Beastline-Gym_Azure:ref:refs/heads/main
- Bootstrap (terraform/bootstrap/) creates state backend — run once locally, excluded from CI triggers
- User's local machine: WSL on Windows (/mnt/c/Users/a.jagadeesh/Downloads/beastline - Azure/)
- Terraform not installed locally; az CLI is installed
Work State
Completed
- Created azure-static-web-apps.yml with path isolation, permissions, concurrency, security audit, deploy gated to push only
- Created terraform.yml with path isolation, concurrency, id-token: write, OIDC env vars at job level
- Created terraform/bootstrap/ (main.tf, providers.tf, versions.tf, outputs.tf) for one-time state backend setup
- Created terraform/backend.tf with use_oidc = true and remote azurerm backend
- Fixed terraform/bootstrap/main.tf: shortened storage name to sttfstatebl (24 char limit), removed deprecated container_access_type
- Added descriptions to all Terraform variables
- Fixed duplicate branches YAML bug in app pipeline PR trigger
- Isolated both pipelines with paths: filters — app pipeline only runs on src/, public/, config files; terraform pipeline only runs on terraform/**
- Rewrote README.md with full beginner-friendly setup guide
- Rewrote terraform/README.md with clear setup instructions
- Fixed OIDC auth: removed azure/login step, added ARM_USE_OIDC, added use_oidc = true to backend block
Active
- User pushed latest fix (use_oidc = true in backend block + removed ARM_USE_CLI) — awaiting pipeline result
Blocked
- Terraform pipeline was failing with: Error building ARM Config: Authenticating using the Azure CLI is only supported as a User (not a Service Principal)
- Latest fix adds use_oidc = true to backend.tf — not yet confirmed working
- User hasn't confirmed if they've run bootstrap locally yet (creates the Azure Storage Account)
Next Move
1. Confirm terraform pipeline passes with the latest fix (use_oidc = true in backend block)
2. If still failing, check official azurerm backend docs for correct OIDC config
3. Ensure user has run bootstrap locally: cd terraform/bootstrap && terraform init && terraform apply
Relevant Files
- .github/workflows/azure-static-web-apps.yml: App CI/CD pipeline (build + deploy to Azure SWA)
- .github/workflows/terraform.yml: Terraform CI/CD pipeline (plan on PR, apply on push)
- terraform/backend.tf: Remote state config with use_oidc = true
- terraform/main.tf: Resource Group + Static Web App resources
- terraform/providers.tf: azurerm provider with use_oidc = true
- terraform/variables.tf: Input variables with descriptions
- terraform/outputs.tf: Hostname + deployment token outputs
- terraform/versions.tf: Terraform >=1.6.0, azurerm ~>4.0
- terraform/.gitignore: Excludes .terraform/, *.tfstate*, terraform.tfvars
- terraform/bootstrap/main.tf: Storage account + container for state backend
- terraform/bootstrap/providers.tf, versions.tf, outputs.tf: Bootstrap config
- terraform/terraform.tfvars: Variable values (resource_group=rg-staticwebapp-dev, location=East Asia)
- README.md: Full project guide with setup steps
- terraform/README.md: Terraform-specific setup guide
- staticwebapp.config.json: Azure SWA routing, security headers, caching
- .gitignore: Standard exclusions (node_modules, dist, .env)
▣  Compaction · Big Pickle · 19.8s
+ Thought: 1.8s
Summary of Our Work
We've set up production-level CI/CD pipelines for your React+Vite gym website deployed to Azure Static Web Apps with Terraform managing infrastructure.
What We Completed:
1. Azure Static Web Apps Pipeline (.github/workflows/azure-static-web-apps.yml)
- Builds React app on PRs (validation only)
- Deploys on push to main
- Path isolation: only triggers on src/, public/, config files
2. Terraform Pipeline (.github/workflows/terraform.yml)
- Plans on PRs, applies on push to main
- OIDC authentication (no long-lived secrets)
- Path isolation: only triggers on terraform/**
- Excludes bootstrap directory (run once locally)
3. Terraform Configuration (terraform/)
- backend.tf: Remote state with OIDC + Entra ID auth
- main.tf: Resource Group + Static Web App
- providers.tf, variables.tf, outputs.tf, versions.tf
- bootstrap/ for initial state backend setup
4. Documentation
- Complete README.md with setup guide
- terraform/README.md with specific instructions
Current Status:
- App pipeline: Working
- Terraform pipeline: Failed with ARM config error (auth issue)
- Root cause: Missing use_azuread_auth = true in backend block
What You Just Fixed:
Added use_azuread_auth = true to terraform/backend.tf - this is required for OIDC Entra ID authentication according to official Terraform docs.
Next Steps:
1. Push the fix and confirm the Terraform pipeline passes
2. Run bootstrap locally if you haven't already: cd terraform/bootstrap && terraform init && terraform apply
3. Test the full workflow: Create a PR with terraform changes, verify plan shows, then merge to main for apply
The pipeline should now work with the use_azuread_auth = true addition.



This means the service principal lacks permissions on the storage account. OIDC auth with use_azuread_auth = true requires RBAC roles, not storage keys.
Your app registration needs the Storage Blob Data Contributor role on the storage account. Run this Azure CLI command:

az role assignment create \
  --role "Storage Blob Data Contributor" \
  --assignee <YOUR_APP_REGISTRATION_CLIENT_ID> \
  --scope /subscriptions/<YOUR_SUBSCRIPTION_ID>/resourceGroups/rg-terraform-state/providers/Microsoft.Storage/storageAccounts/sttfstatebl
Replace <YOUR_APP_REGISTRATION_CLIENT_ID> with your app registration's client ID (the same one stored in AZURE_CLIENT_ID GitHub secret) and <YOUR_SUBSCRIPTION_ID> with your Azure subscription ID.

 Go to portal.azure.com → search for Storage accounts → click sttfstatebl
2. Click Access control (IAM) in the left menu
3. Click + Add → Add role assignment
4. Role tab: search and select Storage Blob Data Contributor → click Next
5. Members tab:
- Membership type: User, group, or service principal
- Click + Select members
- Search for your app registration name (BeastlineGymPipeline or similar)
- Select it → click Select
6. Click Review + assign → Review + assign
After that, push again and the pipeline should pass.