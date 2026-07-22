# Root Cause Analysis

## Main Issues and Their Root Causes

### 1. Authentication Failures
**Root Cause:** Missing OIDC configuration in Terraform backend.

**Details:**
- `use_oidc = true` was not set in `backend.tf`
- `use_azuread_auth = true` was missing (required for Entra ID auth)
- `ARM_USE_OIDC` environment variable was not set in workflow

**Impact:** Terraform couldn't authenticate to Azure using GitHub OIDC.

---

### 2. Permission Denied (403)
**Root Cause:** Service principal lacked RBAC permissions on storage account.

**Details:**
- OIDC with `use_azuread_auth = true` requires RBAC roles
- Storage keys/SAS tokens don't work with Entra ID auth
- App registration needed **Storage Blob Data Contributor** role

**Impact:** Terraform couldn't read/write state files to Azure Storage.

---

### 3. Missing Variable Values
**Root Cause:** `terraform.tfvars` was gitignored.

**Details:**
- `.gitignore` contained `terraform.tfvars`
- CI pipeline couldn't access variable values
- All required variables appeared unset

**Impact:** Terraform plan/apply failed with "No value for required variable".

---

### 4. Existing Resources Not Imported
**Root Cause:** Resources created before Terraform state sync.

**Details:**
- Resource group existed from manual/bootstrap creation
- Static web app existed from previous deployment
- Terraform state didn't know about these resources

**Impact:** Terraform couldn't manage existing resources without import.

---

### 5. Unused Variables in tfvars
**Root Cause:** `terraform.tfvars` contained variables not declared in `variables.tf`.

**Details:**
- `app_location`, `output_location`, `github_repository_url`, `github_branch` were in tfvars
- These variables weren't declared in the Terraform module

**Impact:** Warnings cluttered output, potential confusion.

---

## Key Takeaways

| Issue | Root Cause | Prevention |
|-------|------------|------------|
| Auth failure | Missing OIDC config | Use official Terraform docs for OIDC setup |
| Permission denied | No RBAC role | Assign roles before first run |
| Missing variables | Gitignored tfvars | Commit non-sensitive tfvars |
| Existing resources | State mismatch | Import existing resources first |
| Unused variables | Mismatched declarations | Keep tfvars and variables.tf in sync |

---

## Required Setup Checklist

Before running Terraform pipeline:

- [ ] App registration created in Azure AD
- [ ] Federated credential configured (subject: `repo:<OWNER>/<REPO>:ref:refs/heads/main`)
- [ ] GitHub secrets set: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`
- [ ] Service principal has **Storage Blob Data Contributor** on storage account
- [ ] Bootstrap run locally (creates storage account + container)
- [ ] `terraform.tfvars` committed (if no sensitive values)
- [ ] Import blocks added for existing resources
