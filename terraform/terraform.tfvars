resource_group_name = "rg-staticwebapp-dev"
location            = "East Asia"

static_web_app_name = "my-static-webapp"

github_repository_url = "https://github.com/Alagani/Beastline-Gym_Azure"
github_branch         = "main"

app_location    = "/"
api_location    = ""
output_location = "dist"

sku_tier = "Free"
sku_size = "Free"

tags = {
  Environment = "dev"
  Project     = "Demo"
}