export const monasteries = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    description: 'One of the largest and most significant monasteries in Sikkim, Rumtek is the seat of the Karmapa Lama. It\'s a magnificent example of Tibetan Buddhist architecture.',
    imageId: 'monastery-1',
    mapPosition: { top: '45%', left: '60%' },
    coords: { lat: 27.3065, lng: 88.5724 },
    founded: '16th Century',
    hours: '10 AM - 5 PM',
    lodging: 'Guest house available',
    meals: 'Basic vegetarian meals',
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1628608304724!6m8!1m7!1sCAoSLEFGMVFpcE5qV2l3eF9hbV9OU3BqZ3pfM3Z0X3g2bVd2Zk5tV25sYlRzZ25C!2m2!1d27.3065!2d88.5724!3f238.5!4f-12.5!5f0.7820865888274683"
  },
  {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    description: 'One of the oldest and premier monasteries of Sikkim, it was founded by Lama Lhatsun Chempo. It offers stunning views of Mount Kanchenjunga.',
    imageId: 'monastery-2',
    mapPosition: { top: '55%', left: '20%' },
    coords: { lat: 27.3013, lng: 88.2562 },
    founded: '1705',
    hours: '9 AM - 6 PM',
    lodging: 'Nearby hotels in Pelling',
    meals: 'Local eateries nearby',
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1628608392576!6m8!1m7!1sCAoSLEFGMVFpcE5SOFhZbWstZHRRM1FzZ2dfWG5sZnFzX2VWS1JCMVd4Z3dYc1pT!2m2!1d27.3013!2d88.2562!3f238.5!4f-12.5!5f0.7820865888274683"
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    description: 'Considered the most sacred and holy monastery in Sikkim, it is perched on a heart-shaped hill. It is the site of the famous Bhumchu festival.',
    imageId: 'tashiding-monastery',
    mapPosition: { top: '65%', left: '35%' },
    coords: { lat: 27.2625, lng: 88.3003 },
    founded: '1641',
    hours: '8 AM - 5 PM',
    lodging: 'Limited home-stays',
    meals: 'Basic local food',
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1628608435252!6m8!1m7!1sCAoSLEFGMVFpcE9CUXZzZ0tKN25fM2FwR1JLVXl5X3hYVUtcQzZ0M1Z2Z2pZYjVY!2m2!1d27.2625!2d88.3003!3f238.5!4f-12.5!5f0.7820865888274683"
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    description: 'Located in Gangtok, the 200-year-old Enchey Monastery is an important seat of the Nyingma order. Its name means "solitary temple".',
    imageId: 'monastery-4',
    mapPosition: { top: '38%', left: '70%' },
    coords: { lat: 27.3396, lng: 88.6163 },
    founded: '1909',
    hours: '9 AM - 6 PM',
    lodging: 'Hotels in Gangtok',
    meals: 'Restaurants in Gangtok',
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1628608471331!6m8!1m7!1sCAoSLEFGMVFpcE5LSXlOdDdfX25RM3RzZ0ZfN2hNVWJ2X193Z1RCbVYtMlpZd3hF!2m2!1d27.3396!2d88.6163!3f238.5!4f-12.5!5f0.7820865888274683"
  },
  {
    id: 'dubdi',
    name: 'Dubdi Monastery',
    description: 'Also known as the Yuksom Monastery, Dubdi is considered the first monastery to have been built in Sikkim. It\'s a beautiful trek to reach it.',
    imageId: 'monastery-5',
    mapPosition: { top: '60%', left: '15%' },
    coords: { lat: 27.3592, lng: 88.2299 },
    founded: '1701',
    hours: '8 AM - 4 PM',
    lodging: 'Hotels in Yuksom',
    meals: 'Local eateries in Yuksom',
    panoramaUrl: "https://www.google.com/maps/embed?pb=!4v1628608502844!6m8!1m7!1sCAoSLEFGMVFpcE5LUXlZemdfbDRyU0ZzZ0ZfWG5sZnFzX2VWS1JCMVd4Z3dYc1pT!2m2!1d27.3592!2d88.2299!3f238.5!4f-12.5!5f0.7820865888274683"
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
