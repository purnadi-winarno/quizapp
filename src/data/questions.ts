interface Question {
  id: number;
  image: string;
  correctAnswer: {
    id: string;
    en: string;
  };
  options: {
    id: string[];
    en: string[];
  };
  question: {
    id: string;
    en: string;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop",
    correctAnswer: {
      id: "kucing",
      en: "cat"
    },
    options: {
      id: ["kucin", "kucing", "kucim", "kacin"],
      en: ["kat", "cat", "cet", "cot"]
    },
    question: {
      id: "Hewan apakah ini?",
      en: "What animal is this?"
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop",
    correctAnswer: {
      id: "anjing",
      en: "dog"
    },
    options: {
      id: ["anjeng", "anjing", "anying", "ajing"],
      en: ["dug", "dog", "dag", "dig"]
    },
    question: {
      id: "Hewan apakah ini?",
      en: "What animal is this?"
    }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1628522331661-505646eede3a?q=80&w=870&auto=format&fit=crop",
    correctAnswer: {
      id: "ayam",
      en: "chicken"
    },
    options: {
      id: ["ayem", "ayam", "ayim", "ayom"],
      en: ["cheken", "chicken", "chikin", "chikun"]
    },
    question: {
      id: "Hewan apakah ini?",
      en: "What animal is this?"
    }
  },
  {
    id: 4,
    image: "https://plus.unsplash.com/premium_photo-1661888759779-b10085f08972?q=80&w=864&auto=format&fit=crop",
    correctAnswer: {
      id: "gajah",
      en: "elephant"
    },
    options: {
      id: ["gajah", "gaja", "gojah", "gejah"],
      en: ["elefant", "elephant", "elephent", "elephat"]
    },
    question: {
      id: "Hewan apakah ini?",
      en: "What animal is this?"
    }
  },
  {
    id: 5,
    image: "https://plus.unsplash.com/premium_photo-1664302688826-1521c027c8f8?q=80&w=2964&auto=format&fit=crop",
    correctAnswer: {
      id: "singa",
      en: "lion"
    },
    options: {
      id: ["singa", "singo", "singe", "singah"],
      en: ["lien", "lion", "lyon", "liun"]
    },
    question: {
      id: "Hewan apakah ini?",
      en: "What animal is this?"
    }
  },
  {
    id: 6,
    image: "https://plus.unsplash.com/premium_photo-1667155652500-aa666676fa39?q=80&w=2942&auto=format&fit=crop",
    correctAnswer: {
      id: "kelinci",
      en: "rabbit"
    },
    options: {
      id: ["kelinci", "kalinci", "kelincu", "kelince"],
      en: ["rabit", "rabbit", "rabbet", "rabid"]
    },
    question: {
      id: "Hewan apakah ini?",
      en: "What animal is this?"
    }
  }
]