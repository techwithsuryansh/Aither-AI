


// --------------------------------------
// Emission factors
// --------------------------------------

const travelFactors = {
    car: 0.16664,
    bike: 0.11367,
    bus: 0.10215,
    train: 0.03546,
    walk: 0
};

const electricityFactor = 0.710;


// --------------------------------------
// Main footprint calculation
// --------------------------------------

function calculateFootprint() {

    const travelMode =
        document.getElementById("travelMode").value;

    const travelDistance =
        Number(document.getElementById("travelDistance").value) || 0;

    const electricity =
        Number(document.getElementById("electricity").value) || 0;

    const diet =
        document.getElementById("diet").value;

    const shopping =
        Number(document.getElementById("shopping").value) || 0;


    // -----------------------------
    // Travel
    // -----------------------------

    const yearlyTravelKm =
        travelDistance * 365;

    const travelKg =
        yearlyTravelKm * travelFactors[travelMode];


    // -----------------------------
    // Electricity
    // -----------------------------

    const yearlyElectricity =
        electricity * 12;

    const electricityKg =
        yearlyElectricity * electricityFactor;


    // -----------------------------
    // Food
    // -----------------------------

    let foodKg = 0;

    if (diet === "mixed") {

        foodKg = 1500;

    } else if (diet === "vegetarian") {

        foodKg = 1000;

    } else if (diet === "vegan") {

        foodKg = 700;
    }


    // -----------------------------
    // Shopping
    // -----------------------------

    const shoppingKg =
        shopping * 12 * 0.0008;


    // -----------------------------
    // Total
    // -----------------------------

    const totalKg =
        travelKg +
        electricityKg +
        foodKg +
        shoppingKg;

    const totalTonnes =
        totalKg / 1000;


    // -----------------------------
    // Display total
    // -----------------------------

    document.getElementById("totalResult").textContent =
        totalTonnes.toFixed(2) + " tCO₂e";


    // -----------------------------
    // Display category values
    // -----------------------------

    document.getElementById("travelResult").textContent =
        (travelKg / 1000).toFixed(2) + " t";

    document.getElementById("electricityResult").textContent =
        (electricityKg / 1000).toFixed(2) + " t";

    document.getElementById("foodResult").textContent =
        (foodKg / 1000).toFixed(2) + " t";

    document.getElementById("shoppingResult").textContent =
        (shoppingKg / 1000).toFixed(2) + " t";


    // -----------------------------
    // Update bars
    // -----------------------------

    updateBars(
        travelKg,
        electricityKg,
        foodKg,
        shoppingKg
    );


    // -----------------------------
    // General result message
    // -----------------------------

    let message = "";

    if (totalTonnes < 2) {

        message =
            "Your estimated footprint is relatively low in this prototype.";

    } else if (totalTonnes < 4) {

        message =
            "Your estimated footprint is in the middle range. There may be a few areas worth improving.";

    } else {

        message =
            "Your estimate is relatively high in this prototype. Focus on the biggest contributors first.";
    }


    document.getElementById("resultMessage").textContent =
        message;


    // -----------------------------
    // Show local recommendations
    // -----------------------------

    createRecommendations(
        travelKg,
        electricityKg,
        foodKg,
        shoppingKg,
        travelMode,
        diet
    );


    // -----------------------------
    // Ask Hugging Face AI
    // -----------------------------

    getAIAdvice(
        totalTonnes,
        travelKg / 1000,
        electricityKg / 1000,
        foodKg / 1000,
        shoppingKg / 1000,
        travelMode,
        diet
    );
}


// --------------------------------------
// Update progress bars
// --------------------------------------

function updateBars(
    travel,
    electricity,
    food,
    shopping
) {

    const total =
        travel +
        electricity +
        food +
        shopping;


    if (total === 0) {
        return;
    }


    document.getElementById("travelBar").style.width =
        ((travel / total) * 100) + "%";

    document.getElementById("electricityBar").style.width =
        ((electricity / total) * 100) + "%";

    document.getElementById("foodBar").style.width =
        ((food / total) * 100) + "%";

    document.getElementById("shoppingBar").style.width =
        ((shopping / total) * 100) + "%";
}


// --------------------------------------
// Local recommendations
// --------------------------------------

function createRecommendations(
    travel,
    electricity,
    food,
    shopping,
    travelMode,
    diet
) {

    const recommendations = [];


    // Travel
    if (travel > 500) {

        if (travelMode === "car") {

            recommendations.push(
                "Try public transport or carpooling for some regular journeys."
            );

        } else {

            recommendations.push(
                "Keep using lower-emission travel options where practical."
            );
        }

    } else {

        recommendations.push(
            "Keep combining trips where possible to avoid unnecessary travel."
        );
    }


    // Electricity
    if (electricity > 1000) {

        recommendations.push(
            "Your electricity use is a major contributor. Check appliances and reduce unnecessary usage."
        );

    } else {

        recommendations.push(
            "Continue monitoring electricity use and switch off unused devices."
        );
    }


    // Food
    if (diet === "mixed") {

        recommendations.push(
            "Consider adding more plant-based meals during the week."
        );

    } else {

        recommendations.push(
            "Your selected diet already includes more plant-based choices. Keep it consistent."
        );
    }


    // Shopping
    if (shopping > 7000) {

        recommendations.push(
            "Try avoiding unnecessary purchases and choose durable products when possible."
        );
    }


    // Find largest contributor
    const values = [

        {
            name: "Travel",
            value: travel
        },

        {
            name: "Electricity",
            value: electricity
        },

        {
            name: "Food",
            value: food
        },

        {
            name: "Shopping",
            value: shopping
        }

    ];


    values.sort(function (a, b) {
        return b.value - a.value;
    });


    const largestSource =
        values[0].name;


    recommendations.unshift(
        "Your largest estimated contributor is " +
        largestSource +
        ". Start with this area first."
    );


    const finalRecommendations =
        recommendations.slice(0, 4);


    let html = "";


    finalRecommendations.forEach(function (item) {

        html += `
            <div class="recommendation">
                ${item}
            </div>
        `;
    });


    document.getElementById("recommendations").innerHTML =
        html;
}


// --------------------------------------
// Escape HTML
// --------------------------------------

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// --------------------------------------
// Format AI Markdown response
// --------------------------------------

function formatAIResponse(text) {

    if (!text) {

        return `
            <p>
                No response was received from Aither AI.
            </p>
        `;
    }


    // Remove Windows line endings
    text = text.replace(/\r/g, "");


    // Escape raw HTML first
    text = escapeHTML(text);


    // ----------------------------------
    // Headings
    // ----------------------------------

    text = text.replace(
        /^###\s+(.*)$/gm,
        "<h4>$1</h4>"
    );

    text = text.replace(
        /^##\s+(.*)$/gm,
        "<h3>$1</h3>"
    );

    text = text.replace(
        /^#\s+(.*)$/gm,
        "<h2>$1</h2>"
    );


    // ----------------------------------
    // Bold
    // ----------------------------------

    text = text.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    // ----------------------------------
    // Italic
    // ----------------------------------

    text = text.replace(
        /(?<!\*)\*([^*]+)\*(?!\*)/g,
        "<em>$1</em>"
    );


    // ----------------------------------
    // Numbered list
    // ----------------------------------

    text = text.replace(
        /^\s*(\d+)\.\s+(.*)$/gm,
        '<div class="ai-point"><span>$1.</span> $2</div>'
    );


    // ----------------------------------
    // Bullet list
    // ----------------------------------

    text = text.replace(
        /^\s*[-•]\s+(.*)$/gm,
        '<div class="ai-point"><span>•</span> $1</div>'
    );


    // ----------------------------------
    // Remove markdown divider
    // ----------------------------------

    text = text.replace(
        /^\s*---+\s*$/gm,
        ""
    );


    // ----------------------------------
    // Clean empty lines
    // ----------------------------------

    text = text.replace(
        /\n{3,}/g,
        "\n\n"
    );


    // Double line break
    text = text.replace(
        /\n\n/g,
        "<br><br>"
    );


    // Single line break
    text = text.replace(
        /\n/g,
        "<br>"
    );


    return text;
}


// --------------------------------------
// Display retrieved sources
// --------------------------------------

function showSources(sources) {

    const sourcesBox =
        document.getElementById("sourcesBox");


    if (!sourcesBox) {
        return;
    }


    if (!sources || sources.length === 0) {

        sourcesBox.innerHTML = "";

        return;
    }


    let html = `
        <div class="source-heading">
            Data sources used
        </div>
    `;


    sources.forEach(function (source) {

        const title =
            escapeHTML(source.title || "Source");

        const name =
            escapeHTML(source.source || "");

        const year =
            escapeHTML(String(source.year || ""));

        const factor =
            escapeHTML(source.factor || "");


        html += `
            <div class="source-item">

                <strong>${title}</strong>

                <br>

                <span>
                    ${name} ${year ? "(" + year + ")" : ""}
                </span>

                <br>

                <small>
                    ${factor}
                </small>

            </div>
        `;
    });


    sourcesBox.innerHTML =
        html;
}


// --------------------------------------
// Ask Hugging Face AI through Flask
// --------------------------------------

async function getAIAdvice(
    total,
    travel,
    electricity,
    food,
    shopping,
    travelMode,
    diet
) {

    const box =
        document.getElementById("recommendations");

    const sourcesBox =
        document.getElementById("sourcesBox");


    // Show loading message
    box.innerHTML = `
        <div class="recommendation">
            Aither AI is analysing your lifestyle data...
        </div>
    `;


    // Clear old sources
    if (sourcesBox) {
        sourcesBox.innerHTML = "";
    }


    try {

        const response = await fetch(
            "/api/advice",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    total: total,

                    travel: travel,

                    electricity: electricity,

                    food: food,

                    shopping: shopping,

                    travelMode: travelMode,

                    diet: diet

                })
            }
        );


        // Read server response
        const data =
            await response.json();


        // Check for server/API error
        if (!response.ok || !data.success) {

            throw new Error(
                data.error ||
                "AI request failed"
            );
        }


        // Format the AI response
        const formattedAnswer =
            formatAIResponse(data.answer);


        // Show AI response
        box.innerHTML = `
            <div class="ai-response">
                ${formattedAnswer}
            </div>
        `;


        // Show retrieved sources
        showSources(
            data.sources || []
        );


    } catch (error) {

        console.error(
            "Aither AI error:",
            error
        );


        // Clear sources if AI request fails
        if (sourcesBox) {
            sourcesBox.innerHTML = "";
        }


        // Show fallback message
        box.innerHTML = `
            <div class="recommendation">
                Aither AI could not connect to the AI service.
                Your local analysis is still available.
            </div>
        `;
    }
}


// --------------------------------------
// Load sample data
// --------------------------------------

function loadSample() {

    document.getElementById("travelMode").value =
        "car";

    document.getElementById("travelDistance").value =
        "40";

    document.getElementById("electricity").value =
        "160";

    document.getElementById("diet").value =
        "mixed";

    document.getElementById("shopping").value =
        "4000";


    calculateFootprint();
}


// --------------------------------------
// Reset calculator
// --------------------------------------

function resetCalculator() {

    document.getElementById("travelMode").value =
        "car";

    document.getElementById("travelDistance").value =
        "";

    document.getElementById("electricity").value =
        "";

    document.getElementById("diet").value =
        "mixed";

    document.getElementById("shopping").value =
        "";


    document.getElementById("totalResult").textContent =
        "0.00 tCO₂e";

    document.getElementById("travelResult").textContent =
        "0.00 t";

    document.getElementById("electricityResult").textContent =
        "0.00 t";

    document.getElementById("foodResult").textContent =
        "0.00 t";

    document.getElementById("shoppingResult").textContent =
        "0.00 t";


    document.getElementById("resultMessage").textContent =
        "Enter your details to see an estimate.";


    document.getElementById("recommendations").innerHTML =
        `
            <p>
                Your personalized recommendations will appear here.
            </p>
        `;


    const sourcesBox =
        document.getElementById("sourcesBox");

    if (sourcesBox) {
        sourcesBox.innerHTML = "";
    }


    // Reset bars
    document.getElementById("travelBar").style.width =
        "0%";

    document.getElementById("electricityBar").style.width =
        "0%";

    document.getElementById("foodBar").style.width =
        "0%";

    document.getElementById("shoppingBar").style.width =
        "0%";
}


// --------------------------------------
// Page load
// --------------------------------------

window.addEventListener(
    "load",
    function () {

        const totalResult =
            document.getElementById("totalResult");

        if (totalResult) {

            totalResult.textContent =
                "0.00 tCO₂e";
        }

    }
);