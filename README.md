# Offshore Wind Site
Front end for displaying data generated in the "offshore-wind" project (data is hosted in an R2 bucket).

This project has a basic map UI with regional polygons that depict different areas of interest. When a region is selected a chart comes up to display the timeseries data for that region, as well as a few selectors to further filter the data displayed.

This project is deployed on Cloudflare Pages and relies on Cloudflare's binding system to access the R2 bucket directly in the server functions.