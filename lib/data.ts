export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string[];
    tags: string[];
    quote?: string;
    comments?: { user: string; date: string; text: string }[];
}

export const blogPosts: BlogPost[] = [
    {
        title: "Forever a Girl’s Girl",
        slug: "forever-a-girls-girl",
        date: "1st Aug 2024",
        excerpt: "In the few years I’ve been walking on earth, I’ve interacted with many women and listened to their stories...",
        tags: ["femininity", "happiness", "Liberation", "Life", "love", "Self discovery", "women"],
        content: [
            "In the few years I’ve been walking on earth, I’ve interacted with many women and listened to their stories. I have also had the opportunity to mentor young girls and listen to their stories as well. Mentoring the young girls has me wondering what I was thinking about at 12 and now I think it’s high time I start journaling so that at 50 I’ll have somewhere to look back and give good info to that 25 year old girl, not today’s topic though.",
            "One thing I’ve come to appreciate is the depth and understanding in the safe spaces created by women for women to share their experiences with each other. Even with a million years of life there are things men will never understand that women go through simply because they are not women.",
            "We need to have honest conversations within our circles as women so as to learn, unlearn, relearn and validate each other’s experiences so that we can do better for the ones who will come after us. Each of us, deep within, recognizes our own missteps, if any, and in embracing our journey, we should feel no shame in sharing our stories. Life is short but it is the longest thing one will ever experience and we only have one shot at it. Extending grace for oneself is really important.",
            "I am standing on the shoulders of the ones who came before me",
            "I am stronger for their courage, I am wiser for their words",
            "I am lifted by their longing for a fair and brighter future",
            "I am grateful for their vision, for their toiling on this Earth",
            "Standing on the shoulders by Joyce Rouse",
            "We must stand together as women and not allow ourselves to be divided. This is by celebrating the diversity in our qualities, embracing our individuality and acknowledging our common strengths and courage we share. There is no single way of being a woman or a girl. #Iwannabelikemostgirls.",
            "So on this special day, I hope you actually know that you are beautiful, you are courageous, you are important, you are worthy of love, you deserve abundance in all areas of life, you are enough, you deserve to be happy…regardless of your status, occupation, wrong choices you’ve made etc. I hope you are able to make the best out of the situation you are in. I’m rooting for you! Go girl! You’ve got this!"
        ],
        comments: [
            { user: "swakeinkini", date: "2nd Aug 2024", text: "It always gets better. You are capable!" }
        ]
    },
    {
        title: "The Most Wonderful Time of the Year",
        slug: "the-most-wonderful-time-of-the-year",
        date: "31st Dec 2022",
        excerpt: "Terrible years really make you understand the point of a new year...",
        tags: ["Life", "happiness", "Liberation"],
        quote: "“Terrible years really make you understand the point of a new year. I know nothing will have changed between Dec 31 and Jan 1, but we need to be able to partition off everything that has happened to us, we need a moment to say, “that’s done, we’re done with it, and it’s over” and have a little hope that the future will be different. We need to be able to stop and take a breath and sing, in the middle of winter and prepare ourselves for spring.” Unknown",
        content: [
            "Among the many creations created by man, time is often times my favorite one. Time passes for everyone but does not pass the same way for everyone. So then does time actually exist? Imagine a life without time. Maybe we wouldn’t suffer from the paralyzing fear, that no other animal endures, of time running out but beyond that I don’t see another advantage. Some people say that time is an imaginary concept created by watch makers to sell their watches. (Anyway all that was to trigger your thinking into seeing that time is actually a broad concept… back to our topic.)",
            "In 2022 I have been living in a panicked state that is somewhere between ‘do not be so hard on yourself’ and ‘success is my only option’ and looking back it has not been easy. While life is short, it is the longest thing one will ever experience. Time has gifted me the chance to partition off everything I have been through in 2022 and embrace the hope of a better life in 2023. You do know the power of hope?",
            "This is why I count new years as the most wonderful time of the year. Happy new year!"
        ],
        comments: [
            { user: "Eras", date: "1st Jan 2023", text: "Happy new year" }
        ]
    }
];
