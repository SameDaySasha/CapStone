from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, NumberRange, Length, ValidationError
from app.models import Listing

def address_unique_except_self(form, field, listing_id=None):
    address = field.data
    query = Listing.query.filter(Listing.address == address)
    if listing_id:
        query = query.filter(Listing.id != listing_id)
    listing = query.first()
    if listing:
        raise ValidationError('This address is already in use by another listing.')

class EditListingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message="Title can't be blank")])
    description = StringField('Description', validators=[DataRequired(message="Description can't be blank")])
    address = StringField('Address', validators=[DataRequired(message="Address can't be blank"), lambda form, field: address_unique_except_self(form, field, listing_id=form.listing_id)])
    city = StringField('City', validators=[DataRequired(message="City can't be blank")])
    state = StringField('State', validators=[DataRequired(message="State can't be blank")])
    country = StringField('Country', validators=[DataRequired(message="Country can't be blank")])
    zip_code = StringField('Zip Code', validators=[DataRequired(message="Zip Code can't be blank"), Length(max=10, message="Zip Code must be within 10 characters")])
    price = DecimalField('Price', validators=[DataRequired(message="Starting bid must be a non-negative number"), NumberRange(min=0, message="The starting bid must be a non-negative number")])
    main_image = StringField('Main Image', validators=[DataRequired(message="Main Image can't be blank")])

    def __init__(self, *args, **kwargs):
        self.listing_id = kwargs.pop('listing_id', None)
        super(EditListingForm, self).__init__(*args, **kwargs)
