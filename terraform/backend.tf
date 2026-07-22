terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "sttfstatebl"
    container_name       = "tfstate"
    key                  = "beastline.tfstate"
  }
}
