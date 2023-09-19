from flask import Blueprint, jsonify, request
from app.models import Listing, db
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import CreateListingForm

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
                "price": str(listing.price), 
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
@login_required
def create_listing():
    if current_user.role != 'Manager':
        return jsonify({"error": "Access forbidden: Insufficient permissions"}), 403
    form = CreateListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_listing = Listing(
            title=form.data['title'],
            description=form.data['description'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            zip_code=form.data['zip_code'],
            price=form.data['price'],
            main_image=form.data['main_image'],
        )
        
        db.session.add(new_listing)
        db.session.commit()

        return jsonify(new_listing.to_dict()), 201
    else:
        return jsonify({'errors': form.errors}), 400