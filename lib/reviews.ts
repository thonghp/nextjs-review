import { readFile, readdir } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Metadata } from 'next';

export interface Review {
    slug: string;
    title: string;
    date: string;
    image: string;
    body: string;
}

export async function getReview(slug: string): Promise<Review> {
    const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
    const { content, data: { title, date, image } } = matter(text);
    const body = <string>marked(content);

    return { slug, title, date, image, body };
}

export async function getReviews() {
    const slugs = await getSlugs();
    const reviews = [];
    for (const slug of slugs) {
        const review = await getReview(slug);
        reviews.push(review);
    }
    reviews.sort((a, b) => b.date.localeCompare(a.date))
    return reviews;
}

export async function getFeaturedReview(): Promise<Review> {
    const reviews = await getReviews();
    return reviews[0];
}


export async function getSlugs() {
    // nó đọc ra tất cả file md có trong thư mục
    const files = await readdir('./content/reviews');
    return files.filter(file => file.endsWith('.md'))
        .map(file => file.slice(0, -'.md'.length));
}

export const metadata: Metadata = {
    title: 'Reviews',
};