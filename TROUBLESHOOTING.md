# Troubleshooting Guide

## Issues Encountered During CI/CD Setup

### 1. ARM Config Error - Authenticating using Azure CLI
**Error:**
```
Error building ARM Config: Authenticating using the Azure CLI is only supported as a User (not a Service Principal)
```

**Cause:** Backend block missing `use_oidc` and `use_azuread_auth` flags.

**Fix:** Add to `backend.tf`:
```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "sttfstatebl"
    container_name       = "tfstate"
    key                  = "beastline.tfstate"
    use_oidc             = true
    use_azuread_auth     = true
  }
}
```

---

### 2. AuthorizationPermissionMismatch (403)
**Error:**
```
StatusCode=403 Code="AuthorizationPermissionMismatch" Message="This request is not authorized to perform this operation using this permission."
```

**Cause:** Service principal lacks permissions on storage account. OIDC with `use_azuread_auth = true` requires RBAC roles, not storage keys.

**Fix:** Assign **Storage Blob Data Contributor** role to app registration:
```bash
az role assignment create --role "Storage Blob Data Contributor" --assignee <CLIENT_ID> --scope /subscriptions/<SUB_ID>/resourceGroups/rg-terraform-state/providers/Microsoft.Storage/storageAccounts/sttfstatebl
```

Or via Portal:
1. Storage account → Access control (IAM) → Add role assignment
2. Role: Storage Blob Data Contributor
3. Member: Select your app registration (service principal)

**Note:** Role propagation takes 2-3 minutes.

---

### 3. Required Variables Not Set
**Error:**
```
Error: No value for required variable
  on variables.tf line 1:
  variable "resource_group_name" {
```

**Cause:** `terraform.tfvars` was in `.gitignore` so CI couldn't read variable values.

**Fix:** Remove `terraform.tfvars` from `.gitignore` and commit the file (if no sensitive values).

---

### 4. Undeclared Variables Warning
**Error:**
```
Warning: Value for undeclared variable
  The root module does not declare a variable named "output_location"
```

**Cause:** `terraform.tfvars` contained variables not declared in `variables.tf`.

**Fix:** Remove unused variables from `terraform.tfvars`:
```hcl
# Remove these if not declared in variables.tf:
# app_location
# output_location
# github_repository_url
# github_branch
```

---

### 5. Resource Already Exists (Import Required)
**Error:**
```
Error: a resource with the ID ".../resourceGroups/rg-staticwebapp-dev" already exists
- to be managed via Terraform this resource needs to be imported into the State.
```

**Cause:** Resource group was created manually or via bootstrap before Terraform state was synced.

**Fix:** Add an `import` block to `main.tf` (Terraform 1.5+):
```hcl
import {
  to = azurerm_resource_group.rg
  id = "/subscriptions/<SUB_ID>/resourceGroups/<RESOURCE_GROUP_NAME>"
}
```

---

### 6. Static Web App Already Exists (Import Required)
**Error:**
```
Error: a resource with the ID ".../providers/Microsoft.Web/staticSites/my-static-webapp" already exists
- to be managed via Terraform this resource needs to be imported into the State.
```

**Cause:** Static web app was created manually or via bootstrap before Terraform state was synced.

**Fix:** Add an `import` block to `main.tf` (Terraform 1.5+):
```hcl
import {
  to = azurerm_static_web_app.swa
  id = "/subscriptions/<SUB_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.Web/staticSites/<APP_NAME>"
}
```

---

### 7. GitHub Actions YAML Duplicate Branches
**Error:** Workflow syntax error or unexpected behavior on PR trigger.

**Cause:** Duplicate `branches` key under `pull_request`.

**Fix:** Remove duplicate `branches` block. Correct structure:
```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

---

### 7. Azure CLI Not Installed Locally
**Error:** `az: command not found` when running `az login`.

**Cause:** Azure CLI not installed on local machine.

**Fix:** Install via:
- Windows: `winget install Microsoft.AzureCLI`
- Linux: `curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash`
- macOS: `brew install azure-cli`

---

### 8. Terraform Not Installed Locally
**Error:** `terraform: command not found`

**Cause:** Terraform not installed on local machine.

**Fix:** Install via:
- Windows: `winget install HashiCorp.Terraform`
- Linux: Download from https://developer.hashicorp.com/terraform/install

---

## Quick Reference

### Required GitHub Secrets
| Secret | Description |
|--------|-------------|
| `AZURE_CLIENT_ID` | App registration client ID |
| `AZURE_TENANT_ID` | Azure AD tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID |

### Required Azure RBAC Role
- **Role:** Storage Blob Data Contributor
- **Scope:** Storage account (`sttfstatebl`)
- **Principal:** App registration service principal

### Pipeline Triggers
| Pipeline | Triggers On | Ignores |
|----------|-------------|---------|
| App | `src/`, `public/`, config files | `terraform/**` |
| Terraform | `terraform/**` | `terraform/bootstrap/**` |
