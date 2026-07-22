terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "stterraformstatebeastline"
    container_name       = "tfstate"
    key                  = "beastline.tfstate"
  }
}
