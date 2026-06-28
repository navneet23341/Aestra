require("dotenv").config();

const pool = require("../config/db");
const createEmbedding = require("../services/embeddingService");

async function generateEmbeddings() {

    console.log("Searching products...");

    const result = await pool.query(`
        SELECT *
        FROM products
        WHERE embedding IS NULL
    `);

    console.log(`${result.rows.length} products found.`);

    for(const product of result.rows){

        console.log("Embedding:", product.title);

        const metadata = product.metadata;

        const embeddingText = `
Title: ${product.title}

Brand: ${product.brand}

Category: ${product.category}

Gender: ${product.gender}

Primary Color: ${metadata.primary_color}

Material: ${metadata.material}

Fit: ${metadata.fit}

Pattern: ${metadata.pattern}

Style: ${metadata.style_core.join(", ")}

Aesthetic: ${metadata.fashion_aesthetic.join(", ")}

Occasion: ${metadata.occasion.join(", ")}

Season: ${metadata.season.join(", ")}

Keywords: ${metadata.keywords.join(", ")}

Matching Colors: ${metadata.matching_colors.join(", ")}
`;

        const embedding = await createEmbedding(
            embeddingText
        );

        const vector = `[${embedding.join(",")}]`;

        console.log(typeof embedding);
        console.log(Array.isArray(embedding));
        console.log(embedding.length);
        console.log(embedding.slice(0,5));

        await pool.query(
            `
            UPDATE products
            SET embedding=$1
            WHERE id=$2
            `,
            [
                vector,
                product.id
            ]
        );

        console.log("Done");
    }

    console.log("All products completed.");

    process.exit();
}

generateEmbeddings();