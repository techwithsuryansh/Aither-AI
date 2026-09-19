# Aither AI 🌍

### Personalized Carbon Footprint & Climate Action Advisor

Aither AI is a student project developed as part of the **1M1B AI for Sustainability Virtual Internship**, in collaboration with **IBM SkillsBuild & AICTE**.

The project combines a simple carbon-footprint calculator with AI-powered analysis to help users understand how everyday choices related to **travel, electricity, food, and shopping** contribute to their estimated annual carbon footprint.

---

## 🌱 SDG Alignment

### Primary SDG
**SDG 13 — Climate Action**

Aither AI aims to help users understand their estimated personal carbon footprint and identify practical actions that may support lower-impact everyday choices.

### Secondary SDG
**SDG 12 — Responsible Consumption and Production**

The project also encourages more conscious decisions around travel, energy use, food, and shopping.

---

## 💡 Problem Statement

Many people know that everyday activities contribute to climate change, but they may not have a simple way to understand how their own lifestyle choices relate to carbon emissions.

Aither AI addresses this problem by providing a simple interface where users can enter basic lifestyle information and receive an estimated annual carbon footprint together with personalized climate-action suggestions.

---

## 🎯 Project Objectives

- Estimate an annual carbon footprint from basic lifestyle inputs.
- Identify the largest modeled contributors.
- Provide practical and easy-to-understand recommendations.
- Demonstrate AI as a climate-related decision-support tool.
- Combine source-grounded information with an AI assistant.

---

## ⚙️ How Aither AI Works

```text
User Lifestyle Information
          ↓
Carbon Footprint Calculation
          ↓
Category Breakdown
          ↓
Relevant Knowledge Retrieval
          ↓
Hugging Face AI Analysis
          ↓
Personalized Recommendations
          ↓
Sources Shown to User
```

### User Inputs

- Main travel mode
- Average daily travel distance
- Monthly electricity consumption
- Typical diet
- Approximate monthly shopping expenditure

### Output

- Estimated annual footprint in tonnes CO₂e
- Category-wise breakdown
- Largest estimated contributor
- Personalized climate-action suggestions
- Retrieved data sources used for the AI response

---

## 🤖 AI Components Used

### 1. Rule-Based Calculation

The initial footprint estimate is calculated using defined emission factors and simple calculation logic.

### 2. Prompt Engineering

The calculated results and relevant user information are placed into a structured prompt for the AI model.

### 3. Retrieval-Augmented Generation (RAG)

A local `knowledge_base.json` file contains information about emission factors and supporting evidence.

Aither AI retrieves information relevant to the user's selected categories and includes it in the AI prompt.

### 4. Conversational Decision Support

The Hugging Face language model analyses the user's results and provides practical recommendations in natural language.

### 5. Source Grounding

The application displays the sources used by the retrieval layer so users can see the supporting information behind the AI response.

---

## 🧠 Knowledge Base

The current knowledge base contains information related to:

- Indian electricity grid emission factors
- Car transport reference factors
- Motorbike transport reference factors
- Bus transport reference factors
- Rail transport reference factors
- Food-footprint evidence
- Shopping calculation assumptions

The knowledge base is stored in:

```text
knowledge_base.json
```

Only the travel source relevant to the user's selected travel mode is retrieved.

---

## 🔌 Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### AI
- Hugging Face Inference Providers
- OpenAI-compatible API interface
- Large Language Model for personalized analysis

### Other
- JSON
- Git
- GitHub
- python-dotenv

---

## 📁 Project Structure

```text
Aither-AI/
│
├── index.html
├── style.css
├── script.js
│
├── app.py
├── knowledge_base.json
├── requirements.txt
│
├── .env
├── .gitignore
│
└── README.md
```

### File Description

| File | Purpose |
|------|---------|
| `index.html` | Main web interface |
| `style.css` | Website design and responsive layout |
| `script.js` | Calculator, UI logic and AI request handling |
| `app.py` | Flask backend and Hugging Face API integration |
| `knowledge_base.json` | Local knowledge base used for retrieval |
| `requirements.txt` | Python dependencies |
| `.env` | Stores the Hugging Face API token locally |
| `.gitignore` | Prevents secrets and temporary files from being committed |
| `README.md` | Project documentation |

---

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/aither-ai.git
```

Move into the project folder:

```bash
cd aither-ai
```

---

### 2. Create a virtual environment

#### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

#### Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

Or:

```bash
pip install flask flask-cors openai python-dotenv
```

---

### 4. Add the Hugging Face API token

Create a file named:

```text
.env
```

Add:

```env
HF_TOKEN=your_huggingface_token
```

Do not upload `.env` to GitHub.

The token is loaded by the Flask backend using `python-dotenv`.

---

### 5. Start the Flask application

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

in your browser.

> For the AI-enabled version, open the application through Flask rather than Live Server so `/api/advice` is served by the backend.

---

## 🧪 Using the Prototype

1. Open Aither AI.
2. Enter your lifestyle information.
3. Click **Analyse My Footprint**.
4. The calculator estimates the annual footprint.
5. The application identifies the major modeled contributors.
6. Relevant information is retrieved from the local knowledge base.
7. The data is sent to the Hugging Face model.
8. Aither AI generates personalized climate-action suggestions.
9. The sources used for the AI response are displayed below the response.

A **Try Sample Data** button is also available for demonstrations.

---

## 📊 Carbon Footprint Calculation

The application currently calculates four major categories:

```text
Travel
   +
Electricity
   +
Food
   +
Shopping
   =
Estimated Annual Carbon Footprint
```

The result is displayed in:

```text
tonnes CO₂e / year
```

The application also provides a category-wise breakdown using visual bars.

---

## 📚 Data Sources

The knowledge base currently references:

- **Central Electricity Authority (CEA)** for the Indian grid electricity emission factor.
- **UK Government GHG Conversion Factors** for transport reference factors.
- **Our World in Data** for qualitative food-footprint evidence.
- A clearly labelled prototype assumption for the shopping category.

The retrieved sources are displayed in the application for transparency.

---

## ⚠️ Important Prototype Limitation

Aither AI is a **student prototype**, not an official carbon-accounting or environmental-auditing system.

Some categories use simplified assumptions for demonstration, especially:

- Food
- Shopping

Transport factors are used as reference values and are not presented as India-specific transport factors.

The final value should therefore be treated as an **estimated footprint**, not as a certified or complete carbon audit.

A production version could use more detailed India-specific datasets, activity-level data, and a larger verified knowledge base.

---

## 🔐 Responsible AI

### Fairness

Recommendations should take different lifestyles and circumstances into account and should not assume that expensive alternatives are available to everyone.

### Transparency

The application clearly identifies the result as an estimate and displays the sources retrieved for the AI response.

### Ethics

The AI is designed to provide constructive recommendations rather than blame or shame users for their lifestyle choices.

### Privacy

The prototype does not require personally identifying information and is designed around basic lifestyle inputs.

---

## 👥 Target Users

Aither AI can be useful as an awareness and decision-support tool for:

- Students and young adults
- Urban and semi-urban households
- Young professionals
- People interested in understanding their everyday environmental impact

---

## 🌍 Expected Impact

Aither AI is designed to make carbon-footprint information easier to understand and connect it with everyday actions.

Potential benefits include:

- Better awareness of personal carbon emissions
- Greater understanding of major emission sources
- Encouragement of practical lower-impact choices
- Simple access to climate-related information
- Demonstration of responsible AI for sustainability

The project focuses on **awareness and decision support** rather than claiming guaranteed emission reductions.

---

## 🛠️ Future Improvements

- India-specific transport emission factors
- More detailed food and consumption data
- Improved carbon-footprint methodology
- Larger RAG knowledge base
- Source links inside the application
- User history and progress tracking
- Interactive charts
- Mobile-focused improvements
- More conversational AI features
- Public deployment

---

## 🎓 Internship Context

This project was created for the:

**1M1B AI for Sustainability Virtual Internship**

**In collaboration with IBM SkillsBuild & AICTE**

The project demonstrates the application of AI concepts to a sustainability-related real-world problem.

---

## 👨‍💻 Author

**Your Name**

**Your College Name**

**BCA (DS & AI)**

---

## 📌 Project Status

```text
Prototype Status: Working
AI Integration: Working
RAG Knowledge Base: Working
Hugging Face Integration: Working
Responsive UI: Available
Source Display: Working
```

---

## 📄 Disclaimer

Aither AI is an educational student prototype created for demonstrating AI and sustainability concepts.

The footprint results should be treated as estimates for educational and awareness purposes and should not be used as official environmental accounting.

---

## ⭐ Acknowledgement

Thanks to **1M1B, IBM SkillsBuild and AICTE** for providing the learning environment and project framework for exploring AI applications in sustainability.
