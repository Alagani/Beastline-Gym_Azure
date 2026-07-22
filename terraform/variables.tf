variable "resource_group_name" {
  description = "Name of the Azure resource group"
  type        = string
}

variable "subscription_id" {
  description = "Azure subscription ID"
  type        = string
}

variable "location" {
  description = "Azure region for resources"
  type        = string
}

variable "static_web_app_name" {
  description = "Name of the Azure Static Web App"
  type        = string
}

variable "sku_tier" {
  description = "SKU tier for the Static Web App (Free or Standard)"
  type        = string
  default     = "Free"
}

variable "sku_size" {
  description = "SKU size for the Static Web App (Free or Standard)"
  type        = string
  default     = "Free"
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
}