const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/dapi/restaurants/list/v5", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const response = await axios.get(
            `https://www.swiggy.com/api/dapi/restaurants/list/v5`,
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
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
