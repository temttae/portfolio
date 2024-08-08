interface WorkListItem {
  title: string;
  description: string;
  year: string;
  category: string;
  url: string;
  wip: boolean;
  card_img?: string;
}

export const works: WorkListItem[] = [
  {
    title: "Modeling Customer Probability of Fraud",
    description: "This was an intern project at Infinitas for the refinement of the fraud assessment program.",
    year: "2024",
    category: "internship",
    url: "/works/modeling-probability-of-customer-fraud",
    wip: false,
  },
  {
    title: "f1 box",
    description: "A project in react.",
    year: "2024",
    category: "code",
    url: "/works/f1-box",
    wip: true,
    card_img: "/src/assets/me.jpg"
  },
];
