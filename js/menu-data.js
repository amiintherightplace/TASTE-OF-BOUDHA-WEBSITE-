/**
 * Taste of Boudha and Sherpa Bar — Official Menu Data
 *
 * All 27 menu categories and exact prices reflect the supplied menu items.
 * Items without a visible price in the supplied menu screenshots intentionally
 * leave `price: ''` without guesswork.
 */
window.BOUDHA_MENU_DATA = {
  lastConfirmedNote:
    'All prices shown in Nepalese Rupees (NPR). Items without a listed price can be confirmed directly with the bar or kitchen on WhatsApp.',
  suppliedPriceRangeNote: 'NPR 500–1,000 (from supplied Google listing snapshot)',

  menuGroups: [
    { id: 'all', label: 'All Sections' },
    { id: 'kitchen', label: 'Kitchen & Himalayan' },
    { id: 'breakfast', label: 'Breakfast, Burgers & Pizza' },
    { id: 'bar', label: 'Bar, Beer & Cocktails' },
    { id: 'beverages', label: 'Tea, Coffee & Coolers' }
  ],

  /**
   * Confirmed customer highlights observed in the supplied Google Business Profile listing.
   */
  confirmedHighlights: [
    {
      id: 'chili-honey-momos',
      name: 'Chili Honey Momos',
      highlightLabel: 'Visitor Standout · NPR 350.00 on Menu',
      note: 'Highlighted by visitors in the supplied Google Business Profile listing and listed under Momos as Chily & Honey Momo (NPR 350.00). Message us on WhatsApp for today\'s availability.',
      image: 'images/food/momos-bowl-achar.png',
      imageAlt: 'Hand-pleated momos served at Taste of Boudha and Sherpa Bar',
      whatsappMessage:
        'Hello Taste of Boudha and Sherpa Bar, I would like to ask about your Chili Honey Momos (NPR 350.00) and today\'s availability.'
    },
    {
      id: 'homemade-chyang',
      name: 'Homemade Chyang',
      highlightLabel: 'Reviewer Recommendation',
      note: 'Mentioned by guests in the supplied Google listing ("People say to try the homemade chyang wine"). Ask the team directly on WhatsApp for daily availability and pricing.',
      image: 'images/restaurant/interior-seating.png',
      imageAlt: 'Warm interior dining room at Taste of Boudha and Sherpa Bar in Pokhara',
      whatsappMessage: 'Hello Taste of Boudha and Sherpa Bar, is your homemade chyang available today?'
    }
  ],

  officialMenuCategories: [
    {
      id: 'breakfast',
      group: 'breakfast',
      title: 'Breakfast',
      image: 'images/food/tibetan-flatbread-chutney.png',
      imageAlt: 'Morning plates served at Taste of Boudha and Sherpa Bar',
      items: [
        { name: 'Himalayan Yogi', price: 'NPR 450.00' },
        { name: 'Smilin', price: 'NPR 450.00' },
        { name: 'Cheese On Toast', price: 'NPR 450.00' },
        { name: 'House Special', price: 'NPR 490.00' },
        { name: 'Tsampa Bowl', price: 'NPR 470.00' },
        { name: 'Aalu Baav Set', price: 'NPR 470.00' },
        { name: 'Muesli Bowl', price: 'NPR 450.00' },
        { name: 'Healthy Man', price: 'NPR 490.00' },
        { name: 'French Toast', price: 'NPR 490.00' }
      ]
    },
    {
      id: 'momo',
      group: 'kitchen',
      title: 'Momo',
      image: 'images/food/momos-bowl-achar.png',
      imageAlt: 'Steamed momos served with house dipping achar and noodles',
      items: [
        { name: 'Steam Momo', price: 'NPR 250.00' },
        { name: 'Kothey Momo', price: 'NPR 300.00' },
        { name: 'Fried Momo', price: 'NPR 300.00' },
        { name: 'Chily & Honey Momo', price: 'NPR 350.00' },
        { name: 'C-Momo', price: 'NPR 350.00' },
        { name: 'Soup Momo', price: 'NPR 350.00' }
      ]
    },
    {
      id: 'noodles',
      group: 'kitchen',
      title: 'Noodles',
      image: 'images/food/keema-noodles-greens.png',
      imageAlt: 'Bowl of noodles topped with minced meat, greens, and sesame seeds',
      items: [
        { name: 'Keema Noodle', price: 'NPR 300.00' },
        { name: 'Peans is Noodle', price: 'NPR 350.00' },
        { name: 'Chow Mein', price: 'NPR 300.00' },
        { name: 'Thukpa Soup', price: 'NPR 350.00' },
        { name: 'Thenthuk', price: 'NPR 350.00' }
      ]
    },
    {
      id: 'masu-lover',
      group: 'kitchen',
      title: 'Masu Lover',
      items: [
        { name: 'Sukuti / Chhoila', price: 'NPR 450.00' },
        { name: 'Shyakpa', price: 'NPR 450.00' },
        { name: 'Chhilly', price: 'NPR 450.00' },
        { name: 'Gyuma', price: 'NPR 450.00' },
        { name: 'Sherpa Wings', price: 'NPR 490.00' }
      ]
    },
    {
      id: 'lahping',
      group: 'kitchen',
      title: 'Lahping',
      items: [
        { name: 'Plain-ai', price: 'NPR 130.00' },
        { name: 'Keema', price: 'NPR 180.00' },
        { name: 'Veg', price: 'NPR 130.00' },
        { name: 'Mixed', price: 'NPR 200.00' }
      ]
    },
    {
      id: 'veg-snacks',
      group: 'kitchen',
      title: 'Veg Snacks',
      image: 'images/food/spiced-chili-potatoes.png',
      imageAlt: 'Chili-glazed potatoes topped with scallions on a ceramic platter',
      items: [
        { name: 'Aalu Dum', price: 'NPR 250.00' },
        { name: 'Waiwai Sadeko', price: 'NPR 250.00' },
        { name: 'Aalu Chhilly', price: 'NPR 350.00' }
      ]
    },
    {
      id: 'salad',
      group: 'kitchen',
      title: 'Salad',
      items: [
        { name: 'Fruit Salad', price: 'NPR 400.00' },
        { name: 'Green Salad', price: 'NPR 350.00' },
        { name: 'Russian Salad', price: 'NPR 400.00' }
      ]
    },
    {
      id: 'syabaley',
      group: 'kitchen',
      title: 'Syabaley',
      items: [
        { name: 'Veg', price: 'NPR 300.00' },
        { name: 'Chicken', price: 'NPR 300.00' },
        { name: 'Buff', price: 'NPR 300.00' },
        { name: 'Cheese Topping', price: 'NPR 100.00' }
      ]
    },
    {
      id: 'sherpa-fries',
      group: 'kitchen',
      title: 'Sherpa Fries',
      items: [
        { name: 'Classical', price: 'NPR 300.00' },
        { name: 'Spicy Garlic', price: 'NPR 380.00' },
        { name: 'Chhily & Honey', price: 'NPR 350.00' },
        { name: 'Cheesy Fries', price: 'NPR 400.00' }
      ]
    },
    {
      id: 'heavy-combo',
      group: 'kitchen',
      title: 'Heavy Combo',
      image: 'images/food/momos-noodles-platter.png',
      imageAlt: 'Platter of hand-pleated momos and stir-fried noodles',
      items: [
        { name: 'Dry Mix', price: 'NPR 390.00' },
        { name: 'Mothuk', price: 'NPR 390.00' },
        { name: 'Momo Platter', price: 'NPR 590.00' },
        { name: 'Wings And Fries', price: 'NPR 590.00' },
        { name: 'Shyakpa Rice', price: 'NPR 550.00' }
      ]
    },
    {
      id: 'sandwich',
      group: 'breakfast',
      title: 'Sandwich',
      items: [
        { name: 'Vegan Club Sandwich', price: 'NPR 450.00' },
        { name: 'Cheese Tomato', price: 'NPR 420.00' },
        { name: 'Chicken Sandwich', price: 'NPR 450.00' },
        { name: 'House Special', price: 'NPR 420.00' }
      ]
    },
    {
      id: 'burger',
      group: 'breakfast',
      title: 'Burger',
      items: [
        { name: 'Vegan Burger', price: 'NPR 450.00' },
        { name: 'Veg Burger', price: 'NPR 450.00' },
        { name: 'Juicy Chicken', price: 'NPR 490.00' },
        { name: 'House Special', price: 'NPR 550.00' }
      ]
    },
    {
      id: 'pizza',
      group: 'breakfast',
      title: 'Pizza',
      items: [
        { name: 'Margarita', price: 'NPR 550.00' },
        { name: 'Green Lovers', price: 'NPR 590.00' },
        { name: 'Chicken Mix', price: 'NPR 590.00' },
        { name: 'Hawaiian', price: 'NPR 590.00' },
        { name: 'Meat Lovers', price: 'NPR 690.00' }
      ]
    },
    {
      id: 'extra-toppings',
      group: 'breakfast',
      title: 'Extra Toppings',
      items: [
        { name: 'Mushrooms', price: 'NPR 100.00' },
        { name: 'Pineapple', price: 'NPR 100.00' },
        { name: 'Yak Cheese', price: 'NPR 100.00' },
        { name: 'Tofu', price: 'NPR 100.00' },
        { name: 'Spinach', price: 'NPR 100.00' }
      ]
    },
    {
      id: 'cocktails',
      group: 'bar',
      title: 'Cocktails',
      items: [
        { name: 'Aila Sour', price: 'NPR 590.00' },
        { name: 'Sex On The Beach', price: '' },
        { name: 'Margarita', price: '' },
        { name: 'Sherpa Baileys', price: 'NPR 590.00' },
        { name: 'Pina Colada', price: '' },
        { name: 'Daiquiri', price: '' }
      ]
    },
    {
      id: 'beer-beers',
      group: 'bar',
      title: 'Beer / Beers',
      items: [
        { name: 'Tuborg Beer', price: 'NPR 570.00' },
        { name: 'Gorkha', price: 'NPR 490.00 (Also listed as NPR 350.00)' },
        { name: 'Gorkha Premium', price: 'NPR 540.00' },
        { name: 'Naco Ice', price: 'NPR 440.00' },
        { name: 'San Miguel', price: 'NPR 450.00' },
        { name: 'Tuborg Can', price: 'NPR 400.00' },
        { name: 'Mustang Small Beer', price: 'NPR 300.00' },
        { name: 'Gorkha Strong Small Beer', price: 'NPR 300.00' },
        { name: 'Darsinghe', price: 'NPR 370.00' },
        { name: 'Tuborg Big', price: 'NPR 390.00' }
      ]
    },
    {
      id: 'before-party',
      group: 'bar',
      title: 'Before Party',
      items: [
        { name: 'Gin Tonic', price: 'NPR 590.00' },
        { name: 'Rum Coke', price: 'NPR 490.00' },
        { name: 'Vodka Sprite', price: 'NPR 490.00' },
        { name: 'Whiskey On The Rock', price: 'NPR 490.00' },
        { name: 'Ginseng Ala', price: 'NPR 999.00' }
      ]
    },
    {
      id: 'shots',
      group: 'bar',
      title: 'Shots',
      items: [
        { name: 'Ginseng Ala', price: 'NPR 450.00' },
        { name: 'Tequila', price: 'NPR 590.00' },
        { name: 'Jagar Bomb', price: 'NPR 490.00' }
      ]
    },
    {
      id: 'mocktails',
      group: 'bar',
      title: 'Mocktails',
      items: [
        { name: 'Virgin Mojito', price: 'NPR 450.00' },
        { name: 'Cucumber Mint Cooler', price: '' },
        { name: 'Sexy Lady', price: '' },
        { name: 'Virgin Pina Colada', price: '' },
        { name: 'Virgin Mai Tai', price: '' },
        { name: 'Ginger Mojito', price: '' }
      ]
    },
    {
      id: 'caffeine',
      group: 'beverages',
      title: 'Caffeine',
      items: [
        { name: 'Espresso', price: 'NPR 120.00' },
        { name: 'Americano', price: 'NPR 150.00' },
        { name: 'Cappuccino', price: 'NPR 200.00' },
        { name: 'Cafe Latte', price: 'NPR 200.00' },
        { name: 'Cafe Mocha', price: 'NPR 220.00' },
        { name: 'Caramel Latte', price: 'NPR 250.00' },
        { name: 'Mac Honey Latte', price: 'NPR 280.00' },
        { name: 'Matcha Latte', price: 'NPR 280.00' }
      ]
    },
    {
      id: 'himalayan-medicinal-tea',
      group: 'beverages',
      title: 'Himalayan Medicinal Tea',
      items: [
        { name: 'Hemp Leaf Tea', price: 'NPR 150.00' },
        { name: 'Rosemary Tea', price: 'NPR 150.00' },
        { name: 'Rhododendron Tea', price: 'NPR 150.00' },
        { name: 'Ashwagandha', price: 'NPR 200.00' },
        { name: 'Shilajit & Honey', price: 'NPR 250.00' },
        { name: 'Reishi (Lingzi)', price: 'NPR 350.00' },
        { name: 'Wild Ginseng (Sansam)', price: 'NPR 500.00' }
      ]
    },
    {
      id: 'nepali-style',
      group: 'beverages',
      title: 'Nepali Style',
      items: [
        { name: 'Black Tea', price: 'NPR 70.00' },
        { name: 'Green Tea', price: 'NPR 100.00' },
        { name: 'Lemon Grass Tea', price: 'NPR 100.00' },
        { name: 'Mint Tea', price: 'NPR 100.00' },
        { name: 'Hot Lemon Tea', price: 'NPR 120.00' },
        { name: 'Ginger Honey Lemon', price: 'NPR 150.00' },
        { name: 'Sherpa Butter Tea', price: 'NPR 150.00' }
      ]
    },
    {
      id: 'juice',
      group: 'beverages',
      title: 'Juice',
      items: [
        { name: 'Jab Love', price: 'NPR 290.00' },
        { name: 'Green Love', price: 'NPR 290.00' },
        { name: 'Rainbow Me', price: 'NPR 290.00' },
        { name: 'Rise & Shine', price: 'NPR 290.00' },
        { name: 'Seasonal Juice', price: 'NPR 350.00' }
      ]
    },
    {
      id: 'smoothies',
      group: 'beverages',
      title: 'Smoothies',
      items: [
        { name: 'G Energy', price: 'NPR 300.00' },
        { name: 'Red Devil', price: 'NPR 300.00' },
        { name: 'Green Devil', price: 'NPR 300.00' },
        { name: 'Banana Mar', price: 'NPR 300.00' },
        { name: 'Sweet Dream', price: 'NPR 350.00' }
      ]
    },
    {
      id: 'organic-coolers',
      group: 'beverages',
      title: 'Organic Coolers',
      items: [
        { name: 'Fresh Lemonade', price: 'NPR 200.00' },
        { name: 'Peach Iced Tea', price: 'NPR 250.00' },
        { name: 'Shilajit Honey Iced Tea', price: 'NPR 300.00' },
        { name: 'Ashwagandha Iced Tea', price: 'NPR 300.00' },
        { name: 'Rhododendron Iced Tea', price: 'NPR 350.00' },
        { name: 'Reishi Mushroom Iced Tea', price: 'NPR 380.00' },
        { name: 'Wild Ginseng Iced Tea', price: 'NPR 400.00' },
        { name: 'Kombucha', price: 'NPR 280.00' }
      ]
    },
    {
      id: 'house-drinks',
      group: 'beverages',
      title: 'House Drinks',
      items: [
        { name: 'Plain Lassi', price: 'NPR 200.00' },
        { name: 'Banana Lassi', price: 'NPR 250.00' },
        { name: 'Hot Chocolate', price: 'NPR 250.00' },
        { name: 'Oreo Milk Shake', price: 'NPR 250.00' },
        { name: 'Tsampa Shake', price: 'NPR 300.00' },
        { name: 'Coke - Fanta - Sprite - Soda', price: 'NPR 100.00' },
        { name: 'Seasonal Fresh Juice', price: 'NPR 350.00' },
        { name: 'Water', price: 'NPR 50.00' }
      ]
    },
    {
      id: 'smoothie-bowl',
      group: 'beverages',
      title: 'Smoothie Bowl',
      items: [
        { name: 'Choco Choco', price: 'NPR 450.00' },
        { name: 'Pink Panther', price: 'NPR 450.00' },
        { name: 'Mango Tango', price: 'NPR 450.00' }
      ]
    }
  ]
};
