# Terraform - Azure Infrastructure

Manages the Azure resources for the Beastline Gym website.

## What This Creates

- **Resource Group** — container for Azure resources
- **Static Web App** — where the website is hosted

## How It Works

### First Time Setup (Bootstrap)

Bootstrap creates a storage account where Terraform saves its state. Run this **once**:

```bash
az login
cd terraform/bootstrap
terraform init
terraform apply
cd ../
```

Then migrate to remote state:

```bash
terraform init -migrate-state
```

### Ongoing Usage

After bootstrap, all Terraform runs happen automatically via GitHub Actions when you push changes to `terraform/`.

To run manually:

```bash
cd terraform
terraform plan    # see what would change
terraform apply   # apply the changes
```

## Files

| File | Purpose |
|------|---------|
| `bootstrap/` | One-time setup — creates the state backend |
| `main.tf` | Resource group + Static Web App |
| `backend.tf` | Remote state configuration |
| `providers.tf` | Azure provider settings |
| `variables.tf` | Input variables |
| `outputs.tf` | Output values (hostname, deployment token) |
| `versions.tf` | Terraform + provider version constraints |
| `terraform.tfvars` | Your variable values (not committed) |

## GitHub Actions

The `terraform.yml` workflow runs when `terraform/` files change:

- **Pull Request**: runs `terraform plan` only (no changes applied)
- **Push to main**: runs `terraform apply` (creates/updates resources)

Requires these GitHub secrets:
- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
