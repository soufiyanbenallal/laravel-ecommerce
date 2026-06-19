import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catShoes from "@/assets/cat-shoes.jpg";

export type Category = "Apparel" | "Bags" | "Home" | "Footwear" | "Accessories";
export type Gender = "Women" | "Men" | "Unisex";

export type Product = {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    category: Category;
    gender: Gender;
    image: string;
    gallery?: string[];
    tagline: string;
    description: string;
    details: string[];
    colors: string[];
    sizes?: string[];
    materials: string[];
    collection?: string;
    rating: number;
    reviews: number;
    stock: number;
    badge?: string;
};

const apparelSizes = ["XS", "S", "M", "L", "XL"];
const shoeSizes = ["38", "39", "40", "41", "42", "43", "44"];

export const products: Product[] = [
    {
        id: "halden-cashmere",
        name: "Halden Cashmere Pullover",
        price: 285,
        compareAtPrice: 340,
        category: "Apparel",
        gender: "Women",
        image: catWomen,
        gallery: [catWomen, p1, p6],
        tagline: "Inner Mongolian cashmere, knitted in Scotland.",
        description:
            "A relaxed crewneck shaped from grade-A cashmere fibres, brushed for softness and finished with ribbed cuffs that hold their form season after season.",
        details: [
            "100% cashmere",
            "Knitted in Hawick, Scotland",
            "Hand-finished seams",
            "Oversized fit — size down for regular",
        ],
        colors: ["Bone", "Charcoal", "Clay"],
        sizes: apparelSizes,
        materials: ["Cashmere"],
        collection: "autumn-volume-07",
        rating: 4.9,
        reviews: 128,
        stock: 14,
        badge: "New Season",
    },
    {
        id: "marais-tote",
        name: "Marais Leather Tote",
        price: 420,
        category: "Bags",
        gender: "Unisex",
        image: p2,
        gallery: [p2, p4, p6],
        tagline: "Vegetable-tanned in a single piece of Tuscan leather.",
        description:
            "An unstructured everyday carry that softens with use. The interior is left raw — no lining, no fuss — so the leather can breathe.",
        details: [
            "Full-grain Tuscan leather",
            "Handmade in Florence",
            "Holds a 14-inch laptop",
            "Patinas beautifully over time",
        ],
        colors: ["Cognac", "Black", "Sand"],
        materials: ["Leather"],
        collection: "everyday-essentials",
        rating: 4.8,
        reviews: 94,
        stock: 8,
    },
    {
        id: "ovo-vase",
        name: "Ovo Ceramic Vase",
        price: 96,
        category: "Home",
        gender: "Unisex",
        image: p3,
        tagline: "Wheel-thrown porcelain, fired three times.",
        description:
            "Each vase is shaped by hand, so no two are identical. A matte glaze gives the surface a chalky, paper-like feel.",
        details: [
            "Porcelain, matte glaze",
            "Made in Setagaya, Tokyo",
            "Holds 1.2L",
            "Signed by the maker",
        ],
        colors: ["Bone"],
        materials: ["Porcelain"],
        collection: "tokyo-edit",
        rating: 5.0,
        reviews: 41,
        stock: 6,
        badge: "Limited",
    },
    {
        id: "nara-loafer",
        name: "Nara Leather Loafer",
        price: 365,
        category: "Footwear",
        gender: "Men",
        image: catShoes,
        gallery: [catShoes, p4, catMen],
        tagline: "Blake-stitched on a chiselled last.",
        description:
            "A slim, low-vamp loafer cut from Italian box calf with a leather sole. Built to be resoled, not replaced.",
        details: [
            "Italian box calf",
            "Blake stitch construction",
            "Leather sole",
            "True to size",
        ],
        colors: ["Onyx", "Espresso", "Oxblood"],
        sizes: shoeSizes,
        materials: ["Leather"],
        collection: "everyday-essentials",
        rating: 4.7,
        reviews: 73,
        stock: 11,
    },
    {
        id: "linen-napkins",
        name: "Tavola Linen Napkins (set of 4)",
        price: 64,
        category: "Home",
        gender: "Unisex",
        image: p5,
        tagline: "Stone-washed European linen.",
        description:
            "Generous 50×50cm napkins with hand-rolled hems. The weave softens after every wash.",
        details: [
            "100% European linen",
            "Stone-washed finish",
            "Hand-rolled hems",
            "Set of four",
        ],
        colors: ["Ivory", "Terracotta", "Sage"],
        materials: ["Linen"],
        rating: 4.6,
        reviews: 52,
        stock: 22,
    },
    {
        id: "round-sunglasses",
        name: "Cercle Sunglasses",
        price: 215,
        category: "Accessories",
        gender: "Unisex",
        image: p6,
        tagline: "Gold-plated frames with mineral glass lenses.",
        description:
            "A pared-back round silhouette, hand-assembled in the Jura. The mineral lenses resist scratches and keep their clarity.",
        details: [
            "Gold-plated titanium",
            "CR-39 mineral lenses",
            "100% UV protection",
            "Made in France",
        ],
        colors: ["Gold / Brown"],
        materials: ["Titanium"],
        collection: "everyday-essentials",
        rating: 4.8,
        reviews: 164,
        stock: 18,
        badge: "Bestseller",
    },
    {
        id: "halden-coat",
        name: "Halden Wool Overcoat",
        price: 685,
        category: "Apparel",
        gender: "Women",
        image: catWomen,
        gallery: [catWomen, p1],
        tagline: "Double-faced virgin wool, cut in Porto.",
        description:
            "A long, single-breasted silhouette in pure virgin wool. Tailored shoulders, soft hand, deep welted pockets.",
        details: [
            "100% virgin wool",
            "Cut & sewn in Porto",
            "Single-button closure",
            "Fully lined in cupro",
        ],
        colors: ["Camel", "Charcoal", "Ivory"],
        sizes: apparelSizes,
        materials: ["Wool"],
        collection: "autumn-volume-07",
        rating: 4.9,
        reviews: 86,
        stock: 5,
        badge: "Look 01",
    },
    {
        id: "atelier-shirt",
        name: "Atelier Cotton Shirt",
        price: 145,
        category: "Apparel",
        gender: "Men",
        image: catMen,
        gallery: [catMen, p1],
        tagline: "Long-staple Egyptian cotton, sewn in Japan.",
        description:
            "An unfussy point-collar shirt in a fine cotton poplin. Mother-of-pearl buttons and a curved hem.",
        details: [
            "100% Egyptian cotton",
            "Sewn in Okayama",
            "Mother-of-pearl buttons",
            "Regular fit",
        ],
        colors: ["Bone", "Slate", "Olive"],
        sizes: apparelSizes,
        materials: ["Cotton"],
        rating: 4.7,
        reviews: 211,
        stock: 30,
    },
    {
        id: "porto-trouser",
        name: "Porto Wool Trouser",
        price: 265,
        category: "Apparel",
        gender: "Men",
        image: catMen,
        tagline: "High-rise, single pleat, cuffed hem.",
        description:
            "A relaxed wool trouser with a clean drape. Cut from a mid-weight Italian wool that holds its line.",
        details: [
            "Italian wool blend",
            "Single front pleat",
            "Side adjusters",
            "Unfinished hem",
        ],
        colors: ["Charcoal", "Stone", "Navy"],
        sizes: apparelSizes,
        materials: ["Wool"],
        rating: 4.6,
        reviews: 58,
        stock: 16,
    },
    {
        id: "marais-boot",
        name: "Marais Chelsea Boot",
        price: 495,
        compareAtPrice: 560,
        category: "Footwear",
        gender: "Unisex",
        image: catShoes,
        gallery: [catShoes, p4],
        tagline: "Goodyear-welted in Northamptonshire.",
        description:
            "A clean Chelsea silhouette on a slim leather sole. Designed to be worn daily and resoled twice.",
        details: [
            "Calf leather upper",
            "Goodyear welt",
            "Leather sole",
            "Made in England",
        ],
        colors: ["Black", "Cognac"],
        sizes: shoeSizes,
        materials: ["Leather"],
        rating: 4.8,
        reviews: 47,
        stock: 9,
        badge: "Sale",
    },
    {
        id: "silk-scarf",
        name: "Soie Square Scarf",
        price: 175,
        category: "Accessories",
        gender: "Women",
        image: p6,
        tagline: "Hand-rolled silk twill from Como.",
        description:
            "A 90cm square in heavyweight silk twill. Painted in our Lisbon studio, printed by a single mill in Como.",
        details: [
            "100% silk twill",
            "Hand-rolled hems",
            "Printed in Como",
            "90 × 90 cm",
        ],
        colors: ["Terracotta", "Bone", "Ink"],
        materials: ["Silk"],
        rating: 4.9,
        reviews: 32,
        stock: 12,
    },
    {
        id: "cotton-tee",
        name: "Essentiel Cotton Tee",
        price: 65,
        category: "Apparel",
        gender: "Unisex",
        image: p1,
        tagline: "Heavyweight 280gsm organic cotton.",
        description:
            "A relaxed crewneck in heavyweight organic cotton. Garment-dyed for a soft, lived-in hand.",
        details: [
            "280gsm organic cotton",
            "Garment-dyed",
            "Tubular construction",
            "Made in Portugal",
        ],
        colors: ["Bone", "Black", "Sand", "Olive"],
        sizes: apparelSizes,
        materials: ["Cotton"],
        rating: 4.8,
        reviews: 412,
        stock: 80,
    },
];

export const categories: Category[] = [
    "Apparel",
    "Bags",
    "Footwear",
    "Home",
    "Accessories",
];

export const collections = [
    {
        slug: "autumn-volume-07",
        title: "Autumn — Volume 07",
        tagline: "Quiet objects for the colder months.",
        image: catWomen,
    },
    {
        slug: "everyday-essentials",
        title: "Everyday Essentials",
        tagline: "Pieces we'd take anywhere.",
        image: p2,
    },
    {
        slug: "tokyo-edit",
        title: "The Tokyo Edit",
        tagline: "A small selection from our makers in Setagaya.",
        image: p3,
    },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCollection = (slug: string) =>
    collections.find((c) => c.slug === slug);
export const getProductsByCollection = (slug: string) =>
    products.filter((p) => p.collection === slug);
export const getProductsByCategory = (cat: Category) =>
    products.filter((p) => p.category === cat);
export const getProductsByGender = (g: Gender) =>
    products.filter((p) => p.gender === g || p.gender === "Unisex");
export const searchProducts = (q: string) => {
    const s = q.toLowerCase().trim();
    if (!s) return [];
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(s) ||
            p.category.toLowerCase().includes(s) ||
            p.tagline.toLowerCase().includes(s) ||
            p.materials.join(" ").toLowerCase().includes(s),
    );
};
