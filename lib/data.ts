export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string[];
    tags: string[];
    quote?: string;
    comments?: { user: string; date: string; text: string }[];
    observationNumber?: string;
}

export const blogPosts: BlogPost[] = [
    {
        title: "The Polysemy of Love",
        slug: "the-polysemy-of-love",
        date: "15th Jan 2026",
        observationNumber: "001",
        excerpt: "Deconstructing the \"monstrous parasite\" that ruins small pleasures.",
        tags: ["love", "philosophy", "Lacan", "deconstruction"],
        content: [
            "Love, in its many forms, has been called the most noble of human pursuits. But what if it is also the most parasitic?",
            "When we examine love through the lens of Lacanian psychoanalysis, we begin to see how our desire for the Other often masks a deeper desire for recognition, for validation, for a mirror that reflects back the self we wish we were.",
            "The polysemy of love—its multiple meanings, its shifting signifiers—is precisely what makes it so dangerous. We say 'I love you' and mean a thousand different things, none of which the other person can fully grasp.",
            "Perhaps the first step in reclaiming love is to strip it of its romantic mythology and see it for what it is: a complex negotiation between two subjects, each with their own lack, their own desire, their own fundamental misrecognition."
        ],
        comments: []
    },
    {
        title: "Beyond the Masks",
        slug: "beyond-the-masks",
        date: "28th Dec 2025",
        observationNumber: "002",
        excerpt: "The escape of masculinity and the sophisticated game of the feminine disguise.",
        tags: ["masculinity", "femininity", "identity", "performance"],
        content: [
            "We are all wearing masks. The question is not whether to remove them, but which ones to acknowledge.",
            "Masculinity, in its contemporary crisis, seeks escape routes everywhere—in stoicism, in hustle culture, in the return to 'traditional values.' But these are simply new masks layered over old ones.",
            "The feminine disguise, as Lacan understood it, operates differently. It is a knowing performance, a sophisticated game that acknowledges its own artifice while still playing it with full commitment.",
            "The path beyond the masks is not authenticity—that most overused of modern concepts—but rather a conscious relationship with our own performances. To know that you are performing, and to perform anyway, with intention and awareness."
        ],
        comments: []
    },
    {
        title: "The Lion's Bargain",
        slug: "the-lions-bargain",
        date: "12th Dec 2025",
        observationNumber: "003",
        excerpt: "Why expecting life to be fair is the ultimate tactical error.",
        tags: ["fairness", "philosophy", "Nietzsche", "reality"],
        content: [
            "The lion does not negotiate with the gazelle about the fairness of the hunt. This is not cruelty—it is simply the nature of existence.",
            "When we expect life to be fair, we make a fundamental category error. We impose human social contracts onto a universe that has no knowledge of them.",
            "Nietzsche understood this when he spoke of amor fati—the love of one's fate. This is not passive acceptance, but active embrace. It is the recognition that the game was never fair, and that expecting it to be so is the ultimate tactical error.",
            "The lion's bargain is simple: engage with reality as it is, not as you wish it to be. From this position of clarity, true action becomes possible."
        ],
        comments: []
    },
    {
        title: "The Invisible Courtroom",
        slug: "the-invisible-courtroom",
        date: "1st Dec 2025",
        observationNumber: "004",
        excerpt: "Navigating the social gaze and the architecture of female liberation.",
        tags: ["social gaze", "liberation", "feminism", "Sartre"],
        content: [
            "We live our lives in an invisible courtroom, constantly on trial before judges we cannot see. Sartre called this 'the gaze of the Other'—that perpetual sense of being watched, evaluated, found wanting.",
            "For women, this courtroom has historically been more oppressive, more constant, more unforgiving. The architecture of female liberation must therefore begin with a deconstruction of this gaze.",
            "But liberation is not simply the rejection of all external standards. That path leads only to a different kind of imprisonment—the prison of endless self-definition.",
            "True liberation lies in the ability to navigate the social gaze consciously, to choose which courts to recognize and which verdicts to accept. It is not freedom from judgment, but freedom in how we relate to judgment."
        ],
        comments: []
    }
];
