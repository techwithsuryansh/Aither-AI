import os
import json
from pathlib import Path

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI


# --------------------------------------
# Basic setup
# --------------------------------------

BASE_DIR = Path(__file__).resolve().parent

load_dotenv(BASE_DIR / ".env")

app = Flask(__name__, static_folder=str(BASE_DIR))
CORS(app)


# --------------------------------------
# Hugging Face
# --------------------------------------

hf_token = os.getenv("HF_TOKEN")

client = None

if hf_token:
    client = OpenAI(
        base_url="https://router.huggingface.co/v1",
        api_key=hf_token
    )


# --------------------------------------
# Load local knowledge base
# --------------------------------------

knowledge_file = BASE_DIR / "knowledge_base.json"

with open(knowledge_file, "r", encoding="utf-8") as file:
    knowledge_base = json.load(file)


# --------------------------------------
# Simple RAG retrieval
# --------------------------------------

def retrieve_sources(data):

    selected_topics = {"electricity", "food", "shopping"}

    travel_mode = data.get("travelMode", "")

    travel_source_map = {
        "car": "car",
        "bike": "motorbike",
        "bus": "bus",
        "train": "train"
    }

    selected_travel_source = travel_source_map.get(travel_mode)

    results = []

    for item in knowledge_base:

        # Always include electricity, food and shopping
        if item["topic"] in selected_topics:
            results.append(item)

        # Include only the selected travel source
        elif selected_travel_source and item["id"] == selected_travel_source:
            results.append(item)

    return results


# --------------------------------------
# Serve frontend
# --------------------------------------

@app.route("/")
def home():

    return send_from_directory(
        BASE_DIR,
        "index.html"
    )


@app.route("/<path:filename>")
def serve_file(filename):

    return send_from_directory(
        BASE_DIR,
        filename
    )


# --------------------------------------
# AI advice endpoint
# --------------------------------------

@app.route("/api/advice", methods=["POST"])
def get_advice():

    if client is None:

        return jsonify({
            "success": False,
            "error": "HF_TOKEN is not configured."
        }), 500


    data = request.get_json()

    if not data:

        return jsonify({
            "success": False,
            "error": "No data received."
        }), 400


    total = float(data.get("total", 0))
    travel = float(data.get("travel", 0))
    electricity = float(data.get("electricity", 0))
    food = float(data.get("food", 0))
    shopping = float(data.get("shopping", 0))

    travel_mode = data.get(
        "travelMode",
        "unknown"
    )

    diet = data.get(
        "diet",
        "unknown"
    )


    # ----------------------------------
    # Retrieve source information
    # ----------------------------------

    sources = retrieve_sources(data)


    source_context = "\n\n".join(

        [
            (
                f"Source: {item['source']}\n"
                f"Title: {item['title']}\n"
                f"Year: {item['year']}\n"
                f"Factor: {item['factor']}\n"
                f"Evidence: {item['text']}"
            )

            for item in sources
        ]

    )


    # ----------------------------------
    # RAG-grounded prompt
    # ----------------------------------

    prompt = f"""
You are Aither AI, a climate-action advisor.

The user has completed a personal carbon footprint estimate.

USER DATA
---------
Estimated annual footprint:
{total:.2f} tonnes CO2e

Travel:
{travel:.2f} tonnes

Electricity:
{electricity:.2f} tonnes

Food:
{food:.2f} tonnes

Shopping:
{shopping:.2f} tonnes

Travel mode:
{travel_mode}

Diet:
{diet}


RETRIEVED KNOWLEDGE
-------------------
{source_context}


TASK
----
Analyse the user's result and give practical climate-action advice.

Use the retrieved knowledge when it is relevant.

Your response should contain:

### Biggest contributor
Identify the largest contributor from the supplied calculated categories.

### What it means
Briefly explain why that category matters.

### Three actions
Give three realistic actions the user could consider.

### This week's habit
Give one small action the user can start this week.

### Sources
Mention which source(s) informed your explanation.

IMPORTANT RULES
---------------
- Do not invent emission factors.
- Do not invent carbon-saving percentages.
- Do not present the prototype estimate as a scientific audit.
- The CEA factor is India-specific for the stated fiscal year.
- The transport reference factors are UK reference factors and should not be described as India-specific.
- Food evidence is based on global averages.
- Do not shame the user.
- Keep the answer suitable for a college student.
"""


    try:

        response = client.chat.completions.create(

            model="openai/gpt-oss-120b:fastest",

            messages=[

                {
                    "role": "system",
                    "content": (
                        "You are Aither AI. "
                        "Give transparent, practical and "
                        "source-grounded climate advice."
                    )
                },

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            temperature=0.3,

            max_tokens=600
        )


        answer = response.choices[0].message.content


        source_list = [

            {
                "title": item["title"],
                "source": item["source"],
                "year": item["year"],
                "factor": item["factor"]
            }

            for item in sources
        ]


        return jsonify({

            "success": True,

            "answer": answer,

            "sources": source_list

        })


    except Exception as error:

        print("AI error:", repr(error))

        return jsonify({

            "success": False,

            "error": str(error)

        }), 500


# --------------------------------------
# Run app
# --------------------------------------

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )