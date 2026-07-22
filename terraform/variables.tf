variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
}

variable "static_web_app_name" {
  type = string
}

variable "sku_tier" {
  type    = string
  default = "Free"
}

variable "sku_size" {
  type    = string
  default = "Free"
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
}