const express = require("express");
const router = express.Router();
const Bookmark = require("../models/bookmark");

const jwt = require('jsonwebtoken');

router.post("/addBookmark", async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is missing"
        });
    }

    try {
        // Extract the token from the Authorization header (Bearer token)
        const tokenParts = token.split(' ');
        const jwtToken = tokenParts[1];

        // Verify the JWT token
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = decoded.userId;
        
        const { id } = req.body;

        // Validate if id exists and is a string
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Valid id is necessary to add bookmark"
            });
        }

        // Check if bookmark with the provided ID already exists for the user
        const existingBookmark = await Bookmark.findOne({ userId: userId });

        if (existingBookmark) {
            // Add the new ID to the existing array of bookmarked IDs
            existingBookmark.bookmarkedIds.push(id);
            await existingBookmark.save();

            return res.status(200).json({
                success: true,
                message: "ID added to bookmarks successfully",
                data: existingBookmark
            });
        } else {
            // Create a new bookmark for the user if it doesn't exist
            const newBookmark = new Bookmark({
                userId: userId,
                bookmarkedIds: [id]
            });
            await newBookmark.save();

            return res.status(200).json({
                success: true,
                message: "ID added to bookmarks successfully",
                data: newBookmark
            });
        }
    } catch (error) {
        console.error("Error adding bookmark:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


router.get("/getBookmark", async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is missing"
        });
    }

    try {
        // Extract the token from the Authorization header (Bearer token)
        const tokenParts = token.split(' ');
        const jwtToken = tokenParts[1];

        // Verify the JWT token
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Find the bookmark document for the user
        const bookmark = await Bookmark.findOne({ userId: userId });

        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: "No bookmarks found for the user"
            });
        }

        // Return the bookmarked IDs
        return res.status(200).json({
            success: true,
            message: "Bookmarked IDs fetched successfully",
            data: bookmark.bookmarkedIds
        });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

router.post("/removeBookmark", async (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is missing"
        });
    }

    try {
        // Extract the token from the Authorization header (Bearer token)
        const tokenParts = token.split(' ');
        const jwtToken = tokenParts[1];

        // Verify the JWT token
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { id } = req.body;

        // Validate if id exists and is a string
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Valid id is necessary to remove bookmark"
            });
        }

        // Find the bookmark document for the user
        const bookmark = await Bookmark.findOne({ userId: userId });

        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: "No bookmarks found for the user"
            });
        }

        // Remove the id from the bookmarkedIds array
        bookmark.bookmarkedIds = bookmark.bookmarkedIds.filter(bookmarkedId => bookmarkedId !== id);
        await bookmark.save();

        return res.status(200).json({
            success: true,
            message: "ID removed from bookmarks successfully",
            data: bookmark.bookmarkedIds
        });

    } catch (error) {
        console.error("Error removing bookmark:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;
