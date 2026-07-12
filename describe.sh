#!/bin/bash
IMG=$(base64 -w 0 frame_005.jpg)
PAYLOAD=$(cat <<JSON
{
  "contents": [
    {
      "parts": [
        {"text": "Describe exactly what you see in this image. Is it a mathematical shape? What kind? Extract all text, labels, and code visible. Are there equations?"},
        {
          "inline_data": {
            "mime_type": "image/jpeg",
            "data": "$IMG"
          }
        }
      ]
    }
  ]
}
JSON
)

curl -s -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=$GEMINI_API_KEY" > response.json
