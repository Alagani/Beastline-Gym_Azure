resource "azurerm_resource_group" "state" {
  name     = "rg-terraform-state"
  location = "East Asia"
}

resource "azurerm_storage_account" "state" {
  name                     = "sttfstatebl"
  resource_group_name      = azurerm_resource_group.state.name
  location                 = azurerm_resource_group.state.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "state" {
  name                  = "tfstate"
  storage_account_id    = azurerm_storage_account.state.id
  container_access_type = "private"
}
