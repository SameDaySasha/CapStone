from datetime import datetime
from app.models import db, Listing

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

    db.session.add(listing1)
    db.session.commit()

def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
