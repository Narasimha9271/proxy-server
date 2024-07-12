const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get("/api/restaurants", async (req, res) => {
    const { lat, lng, page_type } = req.query;
    console.log("Received query:", req.query);

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=${page_type}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
        });
        console.log("Response from Swiggy API:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Swiggy API:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send("An error occurred");
        }
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

// app.get("/api/dapi/restaurants/list/v5", async (req, res) => {
//     try {
//         const { lat, lng } = req.query;
//         const response = await axios.get(
//             "https://www.swiggy.com/api/dapi/restaurants/list/v5",
//             {
//                 params: {
//                     lat,
//                     lng,
//                     "is-seo-homepage-enabled": true,
//                     page_type: "DESKTOP_WEB_LISTING",
//                 },
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching data from Swiggy API:", error.message);
//         res.status(500).json({ error: "Failed to fetch data from Swiggy API" });
//     }
// });
