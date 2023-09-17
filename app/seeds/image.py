from datetime import datetime
from app.models import db, Image

def seed_images():
    image1 = Image(
        listing_id=1,
        url='path/to/listing1_image1.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    image2 = Image(
        listing_id=1,
        url='path/to/listing1_image2.jpg',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    # ... (add more image instances as needed)

    db.session.add(image1)
    db.session.add(image2)
    # ... (add the other image instances to the session)
    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
