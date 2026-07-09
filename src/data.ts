import { Product, Recipe, TimelineItem, Store, FAQItem, Review, FlavorQuizQuestion } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'original',
    name: 'Dr Pepper Original',
    tagline: 'The One and Only 23-Flavor Masterpiece',
    description: 'Born in Waco, Texas in 1885, Dr Pepper is the oldest major soft drink in America. Crafted with a unique, proprietary blend of 23 distinct flavors, it has been a signature favorite for over a century because there is absolutely nothing else like it.',
    category: 'classic',
    calories: 150,
    flavorNotes: ['Amaretto', 'Black Cherry', 'Licorice', 'Vanilla', 'Allspice', 'Nutmeg', 'Cola', 'Plum'],
    rating: 4.9,
    image: '/src/assets/images/dr_pepper_can_hero_1783610198728.jpg',
    accentColor: 'text-[#8C1D40]',
    buttonColor: 'bg-[#8C1D40] hover:bg-[#6A122E]',
    bgGradient: 'from-[#4A0D1F] via-[#2A0611] to-[#120106]',
    nutritionInfo: {
      totalFat: '0g (0% DV)',
      sodium: '55mg (2% DV)',
      totalCarb: '40g (15% DV)',
      sugars: '39g',
      protein: '0g',
    },
    purchaseLinks: [
      { retailer: 'Walmart', url: 'https://www.walmart.com' },
      { retailer: 'Target', url: 'https://www.target.com' },
      { retailer: 'Kroger', url: 'https://www.kroger.com' },
    ],
  },
  {
    id: 'cherry',
    name: 'Dr Pepper Cherry',
    tagline: 'An Ultra-Smooth Twist of Dark Cherry',
    description: 'A smooth kiss of cherry makes the oldest soft drink even more irresistible. Dr Pepper Cherry blends the legendary 23-flavor recipe with a deep, dark cherry flavor to deliver a remarkably clean and refreshing finish.',
    category: 'cherry',
    calories: 160,
    flavorNotes: ['Dark Cherry', 'Morello Cherry', 'Vanilla Cream', 'Almond', 'Sweet Cola', 'Proprietary Blend'],
    rating: 4.8,
    image: '/src/assets/images/dr_pepper_cherry_1783610214711.jpg',
    accentColor: 'text-[#D0103A]',
    buttonColor: 'bg-[#D0103A] hover:bg-[#A00827]',
    bgGradient: 'from-[#5E081B] via-[#35020D] to-[#140003]',
    nutritionInfo: {
      totalFat: '0g (0% DV)',
      sodium: '55mg (2% DV)',
      totalCarb: '43g (16% DV)',
      sugars: '42g',
      protein: '0g',
    },
    purchaseLinks: [
      { retailer: 'Walmart', url: 'https://www.walmart.com' },
      { retailer: 'Target', url: 'https://www.target.com' },
      { retailer: 'Instacart', url: 'https://www.instacart.com' },
    ],
  },
  {
    id: 'creamsoda',
    name: 'Dr Pepper & Cream Soda',
    tagline: 'A Velvety Collision of Flavors',
    description: 'The taste you deserve. Dr Pepper Cream Soda harmonizes the iconic 23-flavor blend with the rich, luxurious, and velvety-smooth flavor of Madagascar vanilla cream soda. It is double the comfort, double the flavor, and absolutely outstanding.',
    category: 'cream',
    calories: 150,
    flavorNotes: ['Madagascar Vanilla', 'Caramelized Sugar', 'Sweet Cream', 'Marshmallow', 'Classic 23 Flavors'],
    rating: 4.9,
    image: '/src/assets/images/dr_pepper_cream_soda_1783610228063.jpg',
    accentColor: 'text-[#D99B26]',
    buttonColor: 'bg-[#D99B26] text-black hover:bg-[#B78018]',
    bgGradient: 'from-[#42290B] via-[#241505] to-[#0A0501]',
    nutritionInfo: {
      totalFat: '0g (0% DV)',
      sodium: '50mg (2% DV)',
      totalCarb: '40g (15% DV)',
      sugars: '39g',
      protein: '0g',
    },
    purchaseLinks: [
      { retailer: 'Walmart', url: 'https://www.walmart.com' },
      { retailer: 'Amazon', url: 'https://www.amazon.com' },
      { retailer: 'Target', url: 'https://www.target.com' },
    ],
  },
  {
    id: 'strawberries_cream',
    name: 'Dr Pepper Strawberries & Cream',
    tagline: 'Decadence Meets Dr Pepper',
    description: 'Satisfy your sweet cravings with our newest year-round masterpiece. Combining the delicious, fruity flavor of ripe strawberries with the smooth, luxurious finish of sweet cream, this flavor takes the iconic 23-blend to strawberry heaven.',
    category: 'cream',
    calories: 150,
    flavorNotes: ['Ripe Strawberry', 'Sweet Custard', 'Whipped Cream', 'Red Berry Syrup', 'Warm Vanilla', 'Classic 23'],
    rating: 4.7,
    image: '/src/assets/images/dr_pepper_strawberries_cream_1783610242483.jpg',
    accentColor: 'text-[#E63956]',
    buttonColor: 'bg-[#E63956] hover:bg-[#C2203B]',
    bgGradient: 'from-[#4E101F] via-[#2F0611] to-[#120106]',
    nutritionInfo: {
      totalFat: '0g (0% DV)',
      sodium: '55mg (2% DV)',
      totalCarb: '39g (14% DV)',
      sugars: '38g',
      protein: '0g',
    },
    purchaseLinks: [
      { retailer: 'Walmart', url: 'https://www.walmart.com' },
      { retailer: 'Target', url: 'https://www.target.com' },
      { retailer: 'Kroger', url: 'https://www.kroger.com' },
    ],
  },
  {
    id: 'zerosugar',
    name: 'Dr Pepper Zero Sugar',
    tagline: 'Maximum 23 Flavors. Absolutely Zero Sugar.',
    description: 'Do not compromise on taste. Dr Pepper Zero Sugar delivers the exact, authentic, bold 23-flavor combination you love, but with absolutely zero sugar and zero calories. Crafted with an advanced sweetener system that respects the original recipe.',
    category: 'zero',
    calories: 0,
    flavorNotes: ['Robust Allspice', 'Vanilla Bean', 'Cherry Bark', 'Deep Licorice', 'Zero Calorie Cola Tone'],
    rating: 4.8,
    image: '/src/assets/images/dr_pepper_can_hero_1783610198728.jpg', // will use styled black border or standard hero
    accentColor: 'text-[#111111]',
    buttonColor: 'bg-stone-800 hover:bg-stone-900 text-white',
    bgGradient: 'from-[#292524] via-[#1c1917] to-[#0c0a09]',
    nutritionInfo: {
      totalFat: '0g (0% DV)',
      sodium: '60mg (3% DV)',
      totalCarb: '0g (0% DV)',
      sugars: '0g',
      protein: '0g',
    },
    purchaseLinks: [
      { retailer: 'Walmart', url: 'https://www.walmart.com' },
      { retailer: 'Target', url: 'https://www.target.com' },
      { retailer: 'Amazon', url: 'https://www.amazon.com' },
    ],
  },
  {
    id: 'limited_darkberry',
    name: 'Dr Pepper Dark Berry',
    tagline: 'A Rare, Dark Berry Eclipse',
    description: 'An legendary fan-favorite limited-edition flavor. Dr Pepper Dark Berry pays tribute to premium superhero status with a brilliant combination of dark blue fruits—blackberry, blackcurrant, and blueberry—blended perfectly with the classic Dr Pepper soul.',
    category: 'limited',
    calories: 160,
    flavorNotes: ['Blackberry', 'Blueberry', 'Blackcurrant', 'Cherry Bark', 'Dark Plum', 'Vanilla'],
    rating: 4.9,
    image: '/src/assets/images/dr_pepper_cherry_1783610214711.jpg', // stylized with blue hue
    accentColor: 'text-[#00529B]',
    buttonColor: 'bg-[#00529B] hover:bg-[#003B70]',
    bgGradient: 'from-[#0A2540] via-[#051124] to-[#01040A]',
    nutritionInfo: {
      totalFat: '0g (0% DV)',
      sodium: '55mg (2% DV)',
      totalCarb: '43g (16% DV)',
      sugars: '42g',
      protein: '0g',
    },
    purchaseLinks: [
      { retailer: 'Walmart', url: 'https://www.walmart.com' },
      { retailer: 'Target', url: 'https://www.target.com' },
    ],
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'cherry_pepper_float',
    name: 'The Ultimate Dark Cherry Float',
    description: 'A decadent, modern twist on a childhood classic. High-grade vanilla bean ice cream swimming in ice-cold Dr Pepper Cherry, crowned with dark cherry syrup and a golden sugar rim.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=600',
    category: 'Float',
    prepTime: '5 mins',
    difficulty: 'Easy',
    ingredients: [
      '1 can (12 oz) Dr Pepper Cherry (chilled)',
      '2 scoops Premium Vanilla Bean Ice Cream',
      '2 tbsp Dark Cherry Puree or Syrup',
      'Fresh Bing Cherries for garnish',
      'Whipped Cream'
    ],
    instructions: [
      'Chill a tall craft glass or mason jar in the freezer for 15 minutes.',
      'Spoon 1 tablespoon of dark cherry puree into the bottom of the chilled glass.',
      'Carefully add 2 solid scoops of premium vanilla bean ice cream.',
      'Slowly pour Dr Pepper Cherry over the ice cream at a 45-degree angle to manage the luxurious foam head.',
      'Top with whipped cream, a drizzle of the remaining cherry puree, and garnish with fresh Bing cherries.'
    ],
    prepTips: 'Pour very slowly! The carbonation in Dr Pepper Cherry reacts strongly with the cream in the ice cream, creating a rich, velvety microfoam.',
    shareCount: 1420,
    rating: 4.9
  },
  {
    id: 'burgundy_glaze_wings',
    name: 'Sticky Dr Pepper Burgundy Glaze Wings',
    description: 'An legendary game-day snack. Sweet, savory, tangy, and caramelized chicken wings coated in a sticky reduction made from Dr Pepper Original, molasses, and a hint of chipotle.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600',
    category: 'Dessert', // Or Savory/creative
    prepTime: '35 mins',
    difficulty: 'Creative',
    ingredients: [
      '2 cans (24 oz) Dr Pepper Original',
      '3 lbs Chicken Wings (split and dried)',
      '1/2 cup Dark Brown Sugar',
      '2 tbsp Soy Sauce',
      '1 tbsp Chipotle in Adobo (minced)',
      '3 cloves Garlic (minced)',
      '1 tbsp Apple Cider Vinegar'
    ],
    instructions: [
      'Bake or air-fry wings at 400°F (204°C) for 25-30 minutes until perfectly crisp.',
      'While wings are cooking, combine Dr Pepper Original, brown sugar, soy sauce, garlic, and minced chipotle in a saucepan.',
      'Bring to a boil, then reduce to medium-low. Let simmer and reduce for 20-25 minutes until it becomes a thick, sticky, mahogany syrup.',
      'Stir in the apple cider vinegar to balance the sweetness with acidity.',
      'Toss the crispy wings directly in the hot glaze. Serve garnished with toasted sesame seeds and sliced green onions.'
    ],
    prepTips: 'Make sure your wings are bone-dry before cooking to get maximum crispiness, helping the rich Dr Pepper reduction stick perfectly.',
    shareCount: 3840,
    rating: 5.0
  },
  {
    id: 'peppercorn_mocktail',
    name: 'The Spiced Velvet Mocktail',
    description: 'An elegant, complex, non-alcoholic drink that highlights the warm, herbal spice notes of Dr Pepper. Crafted with fresh orange peel, rosemary, and star anise.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    category: 'Mocktail',
    prepTime: '8 mins',
    difficulty: 'Medium',
    ingredients: [
      '6 oz Dr Pepper Original (chilled)',
      '1 oz Fresh Squeezed Orange Juice',
      '1 slice Fresh Ginger (muddled)',
      '1 sprig Fresh Rosemary',
      '1 whole Star Anise',
      'Ice spheres or large cubes'
    ],
    instructions: [
      'In a cocktail shaker, gently muddle the fresh ginger slice with orange juice.',
      'Add an ice sphere or large cubes to a double old-fashioned tumbler.',
      'Strain the muddled orange-ginger mixture over the ice.',
      'Slowly top with chilled Dr Pepper Original, allowing the layers to float naturally.',
      'Slap a sprig of rosemary between your palms to release the essential oils, insert it into the glass, and garnish with a whole star anise floating on top.'
    ],
    prepTips: 'Slapping the rosemary sprig opens up the aromatic pores, blending beautifully with the herbal licorice and anise elements in the soft drink.',
    shareCount: 928,
    rating: 4.8
  },
  {
    id: 'cream_soda_cupcake',
    name: 'Velvety Dr Pepper & Cream Soda Cupcakes',
    description: 'Irresistibly moist, soft, and aromatic cupcakes baked with Dr Pepper Cream Soda, frosted with a high-gloss whipped vanilla-bean buttercream.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=600',
    category: 'Dessert',
    prepTime: '45 mins',
    difficulty: 'Creative',
    ingredients: [
      '1 cup Dr Pepper & Cream Soda',
      '1/2 cup Unsalted Butter',
      '1/2 cup Unsweetened Cocoa Powder',
      '2 cups All-Purpose Flour',
      '2 cups Granulated Sugar',
      '1 tsp Baking Soda',
      '2 large Eggs',
      '1/2 cup Sour Cream',
      '1 tbsp Vanilla Extract'
    ],
    instructions: [
      'Preheat oven to 350°F (175°C) and line a 12-cup muffin tin with cupcake liners.',
      'In a saucepan, heat butter, Dr Pepper Cream Soda, and cocoa powder until melted. Cool slightly.',
      'Whisk flour, sugar, and baking soda in a large bowl. Pour in the warm butter-soda mixture and mix well.',
      'Whisk in eggs, sour cream, and vanilla extract until completely smooth.',
      'Divide batter into liners and bake for 18-22 minutes. Let cool before frosting with rich cream cheese buttercream.'
    ],
    prepTips: 'The carbonation acts as a natural leavening agent, resulting in an extraordinarily soft, light, and airy crumb structure with intense vanilla aroma.',
    shareCount: 2150,
    rating: 4.9
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '1885',
    title: 'The Spark in Waco, Texas',
    description: 'Pharmacist Charles Alderton invents Dr Pepper at Morrison\'s Old Corner Drug Store. Patrons fall in love with the sweet, spicy aroma of his "Waco" drink, which is later patented on December 1, 1885—making it older than Coca-Cola.',
    badge: 'The Birth'
  },
  {
    year: '1904',
    title: 'World Stage debut',
    description: 'Dr Pepper is introduced to almost 20 million attendees at the historic St. Louis World\'s Fair. This exposure launches the brand into nationwide consciousness, alongside other iconic debuts like the ice cream cone and hot dog bun.',
    badge: 'National Icon'
  },
  {
    year: '1927',
    title: '10, 2, and 4 Campaign',
    description: 'Science reveals that human energy levels naturally dip at 10 AM, 2 PM, and 4 PM. Dr Pepper launches its legendary "10, 2, and 4" advertising campaign, urging workers to grab a refreshing drink to maintain afternoon peak energy.',
    badge: 'Cultural Legend'
  },
  {
    year: '1970s',
    title: 'The "Be a Pepper" Movement',
    description: 'One of the most recognizable marketing campaigns in history debuts. Dancing street performers, regular citizens, and stars celebrate being "a Pepper"—cementing the brand as the anthem of unique, independent people.',
    badge: 'Be a Pepper'
  },
  {
    year: '2008',
    title: 'Independence and Scale',
    description: 'Dr Pepper Snapple Group is established as an independent beverage powerhouse, later merging in 2018 to form Keurig Dr Pepper. The brand continues to grow globally while preserving its original Waco heritage.',
    badge: 'Modern Giant'
  },
  {
    year: '2026',
    title: 'One of a Kind Experience',
    description: 'Celebrating over 140 years of delicious, authentic flavor innovation, Dr Pepper continues to dominate as America\'s favorite unique beverage, expanding its line with decadent options like Strawberries & Cream.',
    badge: 'The Future'
  }
];

export const STORES: Store[] = [
  {
    id: 'store-1',
    name: 'Waco Drug Store & Heritage Center',
    address: '300 S 5th St, Waco, TX 76701',
    distance: '0.4 miles away',
    phone: '(254) 757-1524',
    rating: 4.9,
    coordinates: { lat: 31.5513, lng: -97.1294 },
    features: ['Museum Gift Shop', 'Ice Cream Fountain', 'Exclusive Merch', 'All 23 Flavors'],
    stock: ['original', 'cherry', 'creamsoda', 'strawberries_cream', 'zerosugar', 'limited_darkberry']
  },
  {
    id: 'store-2',
    name: 'Super Walmart Center #4210',
    address: '600 Franklin Ave, Waco, TX 76701',
    distance: '1.2 miles away',
    phone: '(254) 296-0150',
    rating: 4.5,
    coordinates: { lat: 31.5455, lng: -97.1388 },
    features: ['Curbside Pickup', 'Bulk Cases Available', 'Zero Sugar Selection'],
    stock: ['original', 'cherry', 'creamsoda', 'zerosugar', 'strawberries_cream']
  },
  {
    id: 'store-3',
    name: 'Target Express Downtown',
    address: '1101 S Jack Kultgen Expy, Waco, TX 76706',
    distance: '2.1 miles away',
    phone: '(254) 752-1143',
    rating: 4.6,
    coordinates: { lat: 31.5360, lng: -97.1475 },
    features: ['In-Store Pickup', 'Limited Editions In Stock', 'Cold Singles'],
    stock: ['original', 'cherry', 'creamsoda', 'zerosugar', 'limited_darkberry']
  },
  {
    id: 'store-4',
    name: 'H-E-B Grocery Waco',
    address: '910 N Valley Mills Dr, Waco, TX 76710',
    distance: '3.8 miles away',
    phone: '(254) 751-0164',
    rating: 4.8,
    coordinates: { lat: 31.5489, lng: -97.1890 },
    features: ['Cold 12-Packs', 'Local Texas Delivery', 'Hot Deals'],
    stock: ['original', 'cherry', 'creamsoda', 'strawberries_cream', 'zerosugar']
  },
  {
    id: 'store-5',
    name: 'Circle K Convenience #8839',
    address: '1801 Valley Mills Dr, Waco, TX 76711',
    distance: '4.5 miles away',
    phone: '(254) 756-3211',
    rating: 4.2,
    coordinates: { lat: 31.5175, lng: -97.1712 },
    features: ['24/7 Hours', 'Polar Pop Fountain', 'Hot Food'],
    stock: ['original', 'cherry', 'creamsoda']
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are the 23 flavors in Dr Pepper?',
    answer: 'The exact 23 flavors in Dr Pepper are a highly guarded trade secret locked in a secure vault at our Texas headquarters. However, flavor connoisseurs and chemists have widely agreed that the complex blend likely includes amaretto, almond, blackberry, black licorice, caramel, carrot, clove, cherry, ginger, cola, coriander, juniper, lemon, molasses, nutmeg, orange, plum, prune, pepper, vanilla, root beer, and cardamon!',
    category: 'The Recipe'
  },
  {
    id: 'faq-2',
    question: 'Is there prune juice in Dr Pepper?',
    answer: 'No! Despite the persistent urban legend that has circulated for generations, Dr Pepper does not contain prune juice, nor does it contain any prune-byproducts. The flavor profile is a unique, synthetic and natural blend of 23 aromatic herbs, spices, and fruit concentrates.',
    category: 'Myth Busting'
  },
  {
    id: 'faq-3',
    question: 'Why is there no period in "Dr Pepper"?',
    answer: 'Dr Pepper was originally spelled with a period ("Dr. Pepper"). However, in 1950, the period was officially removed for legibility and logo design reasons. The period created a visual break in the custom typography, and removing it made the brand feel more streamlined and modern.',
    category: 'History & Brand'
  },
  {
    id: 'faq-4',
    question: 'Is Dr Pepper a cola or a root beer?',
    answer: 'Neither! Dr Pepper belongs to its own unique product category. In the soft drink industry, Dr Pepper is classified as a "pepper soda"—an independent, spiced beverage category that is distinct from colas, lemon-limes, sarsaparillas, and root beers.',
    category: 'The Recipe'
  },
  {
    id: 'faq-5',
    question: 'How does the Dr Pepper Rewards program work?',
    answer: 'The Dr Pepper Rewards program (Pepper Pack) is our loyalty program. When you buy Dr Pepper products, scan your receipts, upload them to your online profile, and accumulate "Pepper Points". You can redeem points for exclusive brand merchandise, concert tickets, discounts, and entry into the legendary college tuition giveaways!',
    category: 'Rewards'
  },
  {
    id: 'faq-6',
    question: 'Is Dr Pepper gluten-free?',
    answer: 'Yes! All varieties of Dr Pepper soft drinks, including Original, Diet, Zero Sugar, Cherry, and Cream Soda, are gluten-free. They do not contain any ingredients derived from wheat, barley, rye, or oats.',
    category: 'Nutrition'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    user: 'Cassandra M.',
    rating: 5,
    date: 'June 28, 2026',
    text: 'Dr Pepper Strawberries & Cream has literally changed my summer. The smell when you open the can is heaven, and the strawberry taste is real, not fake or chemical-like. Perfect when ice cold!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    verified: true,
    variationPurchased: 'Strawberries & Cream'
  },
  {
    id: 'rev-2',
    user: 'Marcus G.',
    rating: 5,
    date: 'July 2, 2026',
    text: 'I\'ve been a Pepper since 1988, and Dr Pepper Zero Sugar is a technological miracle. I don\'t know how they matched the exact bite of the 23-flavor recipe without any sugar, but I can\'t drink anything else now.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true,
    variationPurchased: 'Zero Sugar'
  },
  {
    id: 'rev-3',
    user: 'Elena R.',
    rating: 5,
    date: 'June 15, 2026',
    text: 'The Dr Pepper and Cream Soda flavor is the smooth dessert of my dreams. The velvety vanilla aroma blends so nicely with the spicy carbonation. Highly recommend pouring it over gelato!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    verified: true,
    variationPurchased: 'Dr Pepper & Cream Soda'
  }
];

export const QUIZ_QUESTIONS: FlavorQuizQuestion[] = [
  {
    id: 1,
    text: 'What is your absolute ideal sensory vibe?',
    options: [
      { id: '1a', text: 'Classic, legendary, and completely unique', score: { original: 3, zerosugar: 2 } },
      { id: '1b', text: 'Sweet, fruity, and decadently rich', score: { strawberries_cream: 3, cherry: 1 } },
      { id: '1c', text: 'Velvety, smooth, and deeply relaxing', score: { creamsoda: 3 } },
      { id: '1d', text: 'Intense, bold, and fruit-forward', score: { cherry: 3, limited_darkberry: 2 } },
    ]
  },
  {
    id: 2,
    text: 'How do you handle sugar in your daily routine?',
    options: [
      { id: '2a', text: 'Give me all the real, caramelized cane sweetness!', score: { original: 2, cherry: 2, creamsoda: 2, strawberries_cream: 2 } },
      { id: '2b', text: 'Strictly zero calorie, zero sugar, high performance', score: { zerosugar: 4 } },
      { id: '2c', text: 'I don\'t mind a mix, as long as the flavor is intense', score: { limited_darkberry: 3, original: 1 } },
    ]
  },
  {
    id: 3,
    text: 'Select your ultimate dessert indulgence:',
    options: [
      { id: '3a', text: 'A fresh bowl of strawberries topped with sweet heavy cream', score: { strawberries_cream: 4 } },
      { id: '3b', text: 'A warm waffle drizzled with melted caramel and vanilla custard', score: { creamsoda: 4 } },
      { id: '3c', text: 'An intense black cherry torte with toasted almonds', score: { cherry: 4 } },
      { id: '3d', text: 'A classic ice cream float with the original recipe', score: { original: 3, zerosugar: 2 } },
    ]
  },
  {
    id: 4,
    text: 'Which setting matches your perfect drink moment?',
    options: [
      { id: '4a', text: 'At a buzzing stadium tailgate with a group of friends', score: { original: 3, zerosugar: 3 } },
      { id: '4b', text: 'Cozying up with an award-winning novel in a dimly lit library', score: { creamsoda: 3, cherry: 2 } },
      { id: '4c', text: 'On a vibrant summer picnic blanket with sunshine and fresh fruit', score: { strawberries_cream: 3 } },
      { id: '4d', text: 'Cruising down a neon-lit highway at midnight', score: { limited_darkberry: 4, cherry: 2 } },
    ]
  }
];
