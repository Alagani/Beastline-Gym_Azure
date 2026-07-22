import {
  to = azurerm_resource_group.rg
  id = "/subscriptions/b2f4370b-28c6-40a2-a873-ae9bf0d6b14f/resourceGroups/rg-staticwebapp-dev"
}

import {
  to = azurerm_static_web_app.swa
  id = "/subscriptions/b2f4370b-28c6-40a2-a873-ae9bf0d6b14f/resourceGroups/rg-staticwebapp-dev/providers/Microsoft.Web/staticSites/my-static-webapp"
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_static_web_app" "swa" {
  name                = var.static_web_app_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  sku_tier = var.sku_tier
  sku_size = var.sku_size

  tags = var.tags
}
