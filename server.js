const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/api/dapi/restaurants/list/v5", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const response = await axios.get(
            "https://www.swiggy.com/api/dapi/restaurants/list/v5",
            {
                params: {
                    lat,
                    lng,
                    "is-seo-homepage-enabled": true,
                    page_type: "DESKTOP_WEB_LISTING",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Swiggy API:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Swiggy API" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
