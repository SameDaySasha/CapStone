from datetime import datetime
from app.models import db, Listing, SCHEMA, environment

def seed_listings():
    listing1 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Secluded Room in Tranquil Norvinsk Region',
        description="Discover a life of serenity and subtle luxury in the heart of the Norvinsk region. This exclusive listing offers a rare opportunity to acquire a private room nestled in a renowned three-story dormitory. Favored by enthusiasts and seekers of solitude alike, room 303 provides a quiet retreat amidst the bustling city of Tarkov. A place where stories unfold and destinies are forged, it's more than just a room—it's an experience waiting to be discovered.",
        address='Three-Story Dorms, Room 303',
        city='Tarkov',
        state='Norvinsk',
        country='TBD',
        zip_code='00000',
        price=750000.00,
        main_image='path/to/subtle_tarkov_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing2 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Hidden Retreat in Quiet Woods Region',
        description="In the midst of the tranquil Woods region lies a hidden retreat awaiting to be discovered. This secluded haven offers the perfect blend of rustic charm and modern amenities, providing a sanctuary where you can unwind and escape the chaos of everyday life. Nestled amidst lush greenery, this property offers unprecedented privacy and peace, making it the perfect haven for those seeking solitude and connection with nature. With its close proximity to key areas in the region, you'll have quick access to all the necessary amenities while still enjoying your secluded paradise.",
        address='Woods Region, Cabin 5',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=950000.00,
        main_image='path/to/woods_cabin_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing3 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Exclusive Lakeside Property in Peaceful Shoreline Area',
        description="Experience the epitome of peace and luxury with this exclusive lakeside property located in the idyllic Shoreline area. This property offers breathtaking views of the serene lake, making it a perfect getaway for those seeking tranquility and natural beauty. The spacious interiors and modern amenities ensure a comfortable and luxurious stay, while the pristine surroundings provide a sense of calm and relaxation. Whether you are looking for a peaceful retreat or an investment opportunity, this property is a gem in the heart of the Shoreline area.",
        address='Shoreline Area, Lakeside Villa 2',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=1150000.00,
        main_image='path/to/shoreline_villa_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing4 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Luxurious Penthouse in Bustling Customs District',
        description="Step into a world of luxury and elegance with this stunning penthouse located in the bustling Customs district. Offering sweeping views of the vibrant cityscape, this property is a haven of modern comfort and style. The penthouse features top-of-the-line amenities and finishes, providing a lavish lifestyle for its residents. Its prime location in the Customs district means you're never far from the best the city has to offer, with numerous shopping, dining, and entertainment options right at your doorstep. Don't miss out on this opportunity to own a piece of the vibrant city life.",
        address='Customs District, Elite Penthouse 42',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=2000000.00,
        main_image='path/to/customs_penthouse_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing5 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Modern Sanctuary in the Heart of the Reserve Area',
        description="Nestled in the heart of the coveted Reserve area, this modern sanctuary offers a rare blend of luxury and tranquility. This premium property boasts state-of-the-art amenities and a seamless blend of modern architecture and natural surroundings. The expansive outdoor area is perfect for entertaining or simply enjoying a peaceful evening under the stars. With close proximity to key locations in the city, this residence offers the perfect balance of convenience and seclusion. Don't miss out on the opportunity to own a piece of paradise in the Reserve area.",
        address='Reserve Area, Modern Mansion 1',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=1750000.00,
        main_image='path/to/reserve_mansion_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing6 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Charming Hideaway in the Quiet Factory District',
        description="Discover the charm of the quiet Factory district with this enchanting hideaway. This property exudes a warm and inviting atmosphere, offering a cozy retreat amidst the industrial surroundings of the district. The vintage-inspired interiors and beautiful outdoor space provide a unique and tranquil living experience. Whether you're looking to escape the hustle and bustle of the city or find a unique investment opportunity, this hideaway in the Factory district is a treasure waiting to be discovered.",
        address='Factory District, Vintage Home 12',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=600000.00,
        main_image='path/to/factory_home_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing7 = Listing(
        created_by=4,
        last_updated_by=4,  
        title='Spectacular Lakeview Residence in Peaceful Shoreline Area',
        description="Experience the beauty of the Shoreline area with this spectacular lakeview residence. Set amidst lush landscapes, this property offers breathtaking views of the tranquil lake and surrounding natural beauty. The spacious interiors and modern amenities make this an ideal home for those seeking a luxurious yet peaceful lifestyle. With easy access to the vibrant city of Norvinsk, this Shoreline residence offers the perfect blend of tranquility and convenience.",
        address='Shoreline Area, Lakeview Mansion 1',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=2100000.00,
        main_image='path/to/shoreline_mansion_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing8 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Rustic Cottage Nestled in Serene Customs Area',
        description="Discover the rustic charm of this cozy cottage nestled in the serene Customs area. Surrounded by picturesque landscapes, this property offers a tranquil retreat where you can escape the hustle and bustle of city life. The cottage features traditional architecture and a warm, inviting interior that creates a homey atmosphere. Whether you're looking for a weekend getaway or a permanent home, this rustic cottage in the Customs area is a true gem.",
        address='Customs Area, Rustic Cottage 7',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=675000.00,
        main_image='path/to/customs_cottage_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing9 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Luxurious Penthouse in Vibrant Interchange District',
        description="Live the high life in this luxurious penthouse located in the vibrant Interchange district. This stunning property offers panoramic views of the city and boasts modern interiors with high-end finishes. The open-concept living space and expansive terrace provide the perfect setting for entertaining and enjoying the bustling city life. With a prime location in the heart of Norvinsk, this penthouse offers the ultimate in luxury and convenience.",
        address='Interchange District, Luxury Penthouse 3001',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=2950000.00,
        main_image='path/to/interchange_penthouse_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing10 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Charming Farmhouse in Idyllic Lighthouse Vicinity',
        description="Escape to the countryside with this charming farmhouse located in the idyllic Lighthouse vicinity. This property offers a rare opportunity to experience the simple pleasures of rural life, with spacious interiors and beautiful outdoor areas to enjoy. The farmhouse boasts traditional architecture with modern updates, providing a comfortable and inviting home. Surrounded by beautiful landscapes and close to the iconic lighthouse, this property offers a tranquil and picturesque living experience.",
        address='Lighthouse Vicinity, Farmhouse 18',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=825000.00,
        main_image='path/to/lighthouse_farmhouse_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing11 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Tranquil Forest Retreat in the Heart of Reserve',
        description="Find peace and tranquility in this forest retreat located in the heart of the Reserve area. This property offers a unique living experience, surrounded by pristine forests and abundant wildlife. The home itself blends seamlessly into the natural environment, providing a tranquil haven where you can reconnect with nature. Experience the beauty of Reserve, where every day feels like a vacation.",
        address='Reserve Area, Forest Retreat 10',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=1230000.00,
        main_image='path/to/reserve_retreat_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing12 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Luxury Apartment in Bustling Factory District',
        description="Experience the vibrant life of the bustling Factory district in this luxury apartment. Positioned in the heart of the city, this property offers a blend of modern comfort and industrial charm. Enjoy the panoramic views of the city skyline and the convenience of living close to a hub of activity, where the pulse of the city is always within reach.",
        address='Factory District, Loft 7B',
        city='Norvinsk',
        state='Central Hub',
        country='TBD',
        zip_code='00000',
        price=870000.00,
        main_image='path/to/factory_loft_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    listing13 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Waterfront Residence in Serene Shoreline Community',
        description="Discover waterfront living at its finest in this serene Shoreline community. This exquisite property offers breathtaking views of the water, coupled with a tranquil environment that evokes a sense of peace and relaxation. The residence features modern amenities and a spacious layout, providing the perfect setting for a life of luxury and comfort by the water.",
        address='Shoreline Community, Waterfront Residence 3',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=1250000.00,
        main_image='path/to/shoreline_residence_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing14 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Sprawling Estate in the Peaceful Reserve Area',
        description="Unveil the secrets of the lush Reserve area with this sprawling estate. Nestled amidst verdant surroundings, this property stands as a beacon of luxury and tranquility. A paradise for those seeking a serene yet lavish lifestyle, it offers expansive spaces, top-notch amenities, and unmatched privacy. Revel in the beauty of nature while enjoying the comforts of a modern home in this exclusive estate.",
        address='Reserve Area, Estate 12',
        city='Norvinsk',
        state='Southern Frontiers',
        country='TBD',
        zip_code='00000',
        price=1850000.00,
        main_image='path/to/reserve_estate_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    listing15 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Charming Hideaway in the Idyllic Customs District',
        description="Find your sanctuary in the idyllic Customs district with this charming hideaway. Set in a picturesque neighborhood, this home offers a perfect blend of traditional charm and modern conveniences. Enjoy the close-knit community vibe and the beauty of the surrounding landscapes as you make this inviting property your new home. It's a place where dreams meet reality, offering a lifestyle that is both comfortable and fulfilling.",
        address='Customs District, Hideaway 8',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=670000.00,
        main_image='path/to/customs_hideaway_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    listing16 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Modern Loft in the Vibrant Interchange Hub',
        description="Experience the heartbeat of the city in this modern loft located in the vibrant Interchange hub. A hub of activity and culture, this area offers a dynamic and exciting lifestyle. The loft itself is a haven of modern luxury, with sleek designs and state-of-the-art amenities. It's a place where style meets convenience, offering a living experience that is truly one-of-a-kind.",
        address='Interchange Hub, Loft 29',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=890000.00,
        main_image='path/to/interchange_loft_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    listing17 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Cozy Cabin in the Heart of the Woods',
        description="Discover a cozy cabin retreat in the heart of the Woods. This property offers a perfect escape from the hustle and bustle of city life, providing a tranquil setting amidst nature. The cabin features rustic designs and modern amenities, creating a warm and inviting atmosphere. It's a place where you can unwind, reconnect with nature, and rejuvenate your spirit.",
        address='Woods Region, Cabin 9',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=750000.00,
        main_image='path/to/woods_cabin_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    listing18 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Lakeside Sanctuary in the Pristine Shoreline Area',
        description="Embrace the beauty of the Shoreline with this exquisite lakeside sanctuary. Boasting panoramic views of the crystal-clear waters, this property offers a peaceful retreat where you can unwind and soak in the natural beauty of the surroundings. The home combines modern luxury with rustic charm, creating a warm and inviting atmosphere that welcomes you with open arms. It's a place where you can find peace, relaxation, and a deep connection with nature.",
        address='Shoreline Area, Lakeside Residence 3',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=1230000.00,
        main_image='path/to/shoreline_lakeside_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    listing19 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Luxurious Villa in the Prestigious Lab District',
        description="Experience the pinnacle of luxury with this stunning villa located in the prestigious Lab district. This property embodies sophistication and elegance, offering an array of high-end amenities and features that cater to a lavish lifestyle. From the modern architecture to the meticulously designed interiors, every detail has been crafted to provide a living experience that is nothing short of extraordinary. It's a place where luxury meets comfort, offering a lifestyle that is truly unparalleled.",
        address='Lab District, Villa 7',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=2370000.00,
        main_image='path/to/lab_villa_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    listing20 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Mountain Retreat in the Serene Factory Outskirts',
        description="Find your haven in the serene Factory outskirts with this enchanting mountain retreat. Set against the backdrop of majestic mountains, this property offers a tranquil setting where you can escape the chaos of daily life. The home features rustic designs combined with modern amenities, creating a harmonious blend of old and new. It's a place where you can unwind, enjoy the beauty of nature, and find peace and tranquility.",
        address='Factory Outskirts, Mountain Home 5',
        city='Norvinsk',
        state='Test',
        country='TBD',
        zip_code='00000',
        price=1050000.00,
        main_image='path/to/factory_mountain_home_image.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )



    db.session.add(listing1)
    db.session.add(listing2)
    db.session.add(listing3)
    db.session.add(listing4)
    db.session.add(listing5)
    db.session.add(listing6)
    db.session.add(listing7)
    db.session.add(listing8)
    db.session.add(listing9)
    db.session.add(listing10)
    db.session.add(listing11)
    db.session.add(listing12)
    db.session.add(listing13)
    db.session.add(listing14)
    db.session.add(listing15)
    db.session.add(listing16)
    db.session.add(listing17)
    db.session.add(listing18)
    db.session.add(listing19)
    db.session.add(listing20)
    db.session.commit()

def undo_listings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM listings"))
        
    db.session.commit()
