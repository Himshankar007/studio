export const monasteries = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    description: 'One of the largest and most significant monasteries in Sikkim, Rumtek is the seat of the Karmapa Lama. It\'s a magnificent example of Tibetan Buddhist architecture.',
    imageId: 'monastery-1',
    mapPosition: { top: '45%', left: '60%' },
    founded: '16th Century',
    hours: '10 AM - 5 PM',
    lodging: 'Guest house available',
    meals: 'Basic vegetarian meals'
  },
  {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    description: 'One of the oldest and premier monasteries of Sikkim, it was founded by Lama Lhatsun Chempo. It offers stunning views of Mount Kanchenjunga.',
    imageId: 'monastery-2',
    mapPosition: { top: '55%', left: '20%' },
    founded: '1705',
    hours: '9 AM - 6 PM',
    lodging: 'Nearby hotels in Pelling',
    meals: 'Local eateries nearby'
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    description: 'Considered the most sacred and holy monastery in Sikkim, it is perched on a heart-shaped hill. It is the site of the famous Bhumchu festival.',
    imageId: 'monastery-3',
    mapPosition: { top: '65%', left: '35%' },
    founded: '1641',
    hours: '8 AM - 5 PM',
    lodging: 'Limited home-stays',
    meals: 'Basic local food'
  },
    {
    id: 'enchey',
    name: 'Enchey Monastery',
    description: 'Located in Gangtok, the 200-year-old Enchey Monastery is an important seat of the Nyingma order. Its name means "solitary temple".',
    imageId: 'monastery-4',
    mapPosition: { top: '38%', left: '70%' },
    founded: '1909',
    hours: '9 AM - 6 PM',
    lodging: 'Hotels in Gangtok',
    meals: 'Restaurants in Gangtok'
  },
    {
    id: 'dubdi',
    name: 'Dubdi Monastery',
    description: 'Also known as the Yuksom Monastery, Dubdi is considered the first monastery to have been built in Sikkim. It\'s a beautiful trek to reach it.',
    imageId: 'monastery-5',
    mapPosition: { top: '60%', left: '15%' },
    founded: '1701',
    hours: '8 AM - 4 PM',
    lodging: 'Hotels in Yuksom',
    meals: 'Local eateries in Yuksom'
  }
];

export const experiences = [
  {
    id: 'peace-seeker',
    title: 'Peace-Seeker Spiritual Retreat',
    description: 'A 7-day immersive retreat in a functioning monastery. Participate in daily chants, meditation, and philosophy teachings.',
    imageId: 'experience-1',
    price: 'Starting at $500'
  },
  {
    id: 'himalayan-trek',
    title: 'Himalayan Monastery Trek',
    description: 'A guided 5-day trek connecting three remote monasteries. Includes camping, a local guide, and all meals.',
    imageId: 'experience-2',
    price: 'Starting at $450'
  },
  {
    id: 'culture-workshop',
    title: 'Cultural Heritage Workshop',
    description: 'A weekend workshop on Thangka painting and Buddhist calligraphy, taught by local masters in Gangtok.',
    imageId: 'experience-3',
    price: 'Starting at $200'
  }
];

export const products = [
  {
    id: 'soap',
    name: 'Handmade Juniper Soap',
    monastery: 'Rumtek Monastery',
    imageId: 'product-1',
    price: '$8'
  },
  {
    id: 'incense',
    name: 'Himalayan Herbal Incense',
    monastery: 'Pemayangtse Monastery',
    imageId: 'product-2',
    price: '$12'
  },
  {
    id: 'tea',
    name: 'Organic Sikkim Black Tea',
    monastery: 'Local Cooperative',
    imageId: 'product-3',
    price: '$15'
  },
  {
    id: 'scarf',
    name: 'Hand-woven Prayer Scarf',
    monastery: 'Enchey Monastery Weavers',
    imageId: 'product-4',
    price: '$25'
  },
    {
    id: 'prayer-beads',
    name: 'Bodhi Seed Prayer Beads',
    monastery: 'Tashiding Monastery',
    imageId: 'product-5',
    price: '$30'
  },
   {
    id: 'butter-lamp',
    name: 'Traditional Brass Butter Lamp',
    monastery: 'Local Artisan Collective',
    imageId: 'product-6',
    price: '$45'
  },
   {
    id: 'singing-bowl',
    name: 'Hand-hammered Singing Bowl',
    monastery: 'Gangtok Market',
    imageId: 'product-7',
    price: '$70'
  },
   {
    id: 'thangka-print',
    name: 'A4 Thangka Art Print',
    monastery: 'Pemayangtse Art School',
    imageId: 'product-8',
    price: '$20'
  },
];
