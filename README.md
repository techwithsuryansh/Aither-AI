# Aither AI

### Personalized Carbon Footprint & Climate Action Advisor

Aither AI is a student project developed for the **1M1B AI for Sustainability Virtual Internship**, in collaboration with **IBM SkillsBuild & AICTE**.

The project helps users understand their estimated yearly carbon footprint from everyday activities and provides AI-generated suggestions for practical climate action.

---

## SDG Alignment

**Primary SDG:** SDG 13 — Climate Action  
**Secondary SDG:** SDG 12 — Responsible Consumption and Production

---

## Problem

People often know that everyday activities affect the environment, but it can be difficult to understand their own carbon footprint and identify which habits contribute the most.

Aither AI provides a simple way to enter lifestyle information and receive an estimated footprint with personalized recommendations.

---

## How It Works

```text
Lifestyle Inputs
      ↓
Carbon Footprint Calculation
      ↓
Category Breakdown
      ↓
Relevant Knowledge Retrieval
      ↓
Hugging Face AI
      ↓
Personalized Climate Advice
      ↓
Sources Displayed
```

Users provide information about:

- Travel
- Electricity
- Food
- Shopping

The system calculates an estimated annual footprint and identifies the largest modeled contributor.

---

## AI Components

- Rule-based footprint calculation
- Prompt engineering
- Retrieval-Augmented Generation (RAG)
- Hugging Face Inference API
- AI-based decision support
- Source-grounded recommendations

A local `knowledge_base.json` file contains reference information. Relevant information is retrieved before the AI response is generated.

---

## Technologies

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Python
- Flask
- Flask-CORS

**AI**
- Hugging Face Inference Providers
- Large Language Model

**Other**
- JSON
- Git
- GitHub
- python-dotenv

---

## Project Structure

```text
Aither-AI/
├── index.html
├── style.css
├── script.js
├── app.py
├── knowledge_base.json
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

---

## Run Locally

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
HF_TOKEN=your_huggingface_token
```

Then start the application:

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

For the AI-enabled version, use the Flask URL rather than Live Server.

---

## Output

Aither AI displays:

- Estimated annual carbon footprint in **tCO₂e**
- Travel, electricity, food, and shopping breakdown
- Largest estimated contributor
- AI-generated climate-action suggestions
- Knowledge-base sources used by the AI

---

## Responsible AI

**Fairness:** Recommendations should consider different lifestyles and circumstances.

**Transparency:** Results are presented as estimates and supporting sources are shown.

**Ethics:** The system provides constructive advice without blaming or shaming users.

**Privacy:** The prototype does not require personal identifying information.

---

## Prototype Limitation

Aither AI is an educational prototype, not an official carbon-accounting or environmental-auditing tool.

Some categories use simplified assumptions for demonstration. The results should therefore be treated as estimates rather than certified carbon measurements.

---

## Expected Impact

The project aims to make climate information easier to understand and connect everyday lifestyle choices with practical actions.

It can support:

- Climate awareness
- Better understanding of emission sources
- More conscious everyday choices
- Student learning about AI for sustainability

---

## Project Status

**Working Prototype**

- Carbon Calculator: ✅
- Hugging Face AI: ✅
- RAG Knowledge Base: ✅
- Source Display: ✅
- Responsive UI: ✅

---

##  Author

**Suryansh Sinha**  
**Gopal Narayan Singh University**  
**BCA (DS & AI)**

---

## Acknowledgement

Developed as part of the **1M1B AI for Sustainability Virtual Internship** in collaboration with **IBM SkillsBuild & AICTE**.
