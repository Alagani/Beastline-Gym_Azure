output "default_hostname" {
  value = azurerm_static_web_app.swa.default_host_name
}

output "deployment_token" {
  value     = azurerm_static_web_app.swa.api_key
  sensitive = true
}