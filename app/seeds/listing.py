from datetime import datetime
from app.models import db, Listing

def seed_listings():
    listing1 = Listing(
        created_by=4,
        last_updated_by=4,
        title='Beautiful Family Home',
        description='A beautiful family home with a spacious garden...',
        address='123 Main St',
        city='Springfield',
        state='IL',
        country='USA',
        zip_code='62704',
        price=300000.00,
        main_image='path/to/image1.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    # ... (add more listing instances as needed)

    db.session.add(listing1)
    # ... (add the other listing instances to the session)
    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
