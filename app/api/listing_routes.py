from flask import Blueprint, jsonify
from app.models import Listing


listing_routes = Blueprint('listings', __name__)


# get all routes -- HOME PAGE ROUTE
@listing_routes.route('/listings', methods=['GET'])
def get_all_listings():
    try:
        listings = Listing.query.all()
        response_data = [
            {
                "id": listing.id,
                "created_by": listing.created_by,
                "last_updated_by": listing.last_updated_by,
                "title": listing.title,
                "description": listing.description,
                "address": listing.address,
                "city": listing.city,
                "state": listing.state,
                "country": listing.country,
                "zip_code": listing.zip_code,
                "price": str(listing.price),  # Assuming price is of Decimal type
                "main_image": listing.main_image,
                "created_at": listing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
                "updated_at": listing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
            }
            for listing in listings
        ]
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"error": "Error with GetAllListingsRoute", "message": str(e)}), 500

