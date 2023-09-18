from flask import Blueprint, jsonify, request
from app.models import Listing
from datetime import datetime

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

# Get listing by ID -- INDIVIDUAL LISTING PAGE ROUTE -- TBT
@listing_routes.route('/listings/<int:id>', methods=['GET'])
def get_listing_by_id(id):
    try:
        listing = Listing.query.get(id)
        if listing:
            response = {
                "id": listing.id,
                "created_by": listing.created_by,
                "title": listing.title,
                "description": listing.description,
                "address": listing.address,
                "city": listing.city,
                "state": listing.state,
                "country": listing.country,
                "zip_code": listing.zip_code,
                "price": str(listing.price),
                "main_image": listing.main_image,
                "created_at": listing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
                "updated_at": listing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
            }
            return jsonify(response), 200
        else:
            return jsonify({
                "error": "Error with GetListingByIDRoute",
                "message": "Listing not found"
            }), 404
    except Exception as e:
        return jsonify({
            "error": "Error with GetListingByIDRoute",
            "message": "Internal server error",
            "details": str(e)
        }), 500

# Create new listing route  -TBT
@listing_routes.route('/listings', methods=['POST'])
def create_new_listing():
    try:
        data = request.get_json()
        
        # Validation: Check if any field is missing or blank
        errors = {}
        fields = ["title", "description", "address", "city", "state", "country", "zip_code", "price", "main_image"]
        for field in fields:
            if not data.get(field):
                errors[field] = [f"{field.capitalize()} can't be blank"]

        # If there are errors, return a 400 status code with error messages
        if errors:
            return jsonify({"errors": errors}), 400

        # Create a new Listing object with the data from the request
        new_listing = Listing(
            created_by=1,  # Assuming 1 is the ID of the manager creating the listing
            title=data["title"],
            description=data["description"],
            address=data["address"],
            city=data["city"],
            state=data["state"],
            country=data["country"],
            zip_code=data["zip_code"],
            price=data["price"],
            main_image=data["main_image"],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        # Add the new listing to the database and commit the changes
        db.session.add(new_listing)
        db.session.commit()

        # Create a response object with the data of the new listing
        response = {
            "id": new_listing.id,
            "created_by": new_listing.created_by,
            "title": new_listing.title,
            "description": new_listing.description,
            "address": new_listing.address,
            "city": new_listing.city,
            "state": new_listing.state,
            "country": new_listing.country,
            "zip_code": new_listing.zip_code,
            "price": str(new_listing.price),  # Assuming price is of Decimal type
            "main_image": new_listing.main_image,
            "created_at": new_listing.created_at.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "updated_at": new_listing.updated_at.strftime('%Y-%m-%dT%H:%M:%SZ')
        }
        
        # Return a 201 status code with the data of the new listing
        return jsonify(response), 201

    except Exception as e:
        # If there is a server error, return a 500 status code with an error message
        return jsonify({"error": "Error with CreateNewListingRoute", "message": "Internal server error", "details": str(e)}), 500
