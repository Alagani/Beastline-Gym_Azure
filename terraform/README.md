# Azure Static Web App Terraform

## Prerequisites

Create the remote state backend once before first `terraform apply`:

```bash
az login
az group create -n rg-terraform-state -l "East Asia"
az storage account create -n stterraformstatebeastline -g rg-terraform-state -l "East Asia" --sku Standard_LRS
az storage container create -n tfstate --account-name stterraformstatebeastline
```

## GitHub Actions (OIDC)

Create a service principal and add these secrets to the repo:

```bash
az ad sp create-for-fid -n "sp-beastline-terraform" --role "Contributor" --scopes "/subscriptions/<SUBSCRIPTION_ID>"
```

Add to GitHub repo secrets:
- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

## Usage

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

Note: GitHub repo connection is completed after provisioning or via AzAPI.