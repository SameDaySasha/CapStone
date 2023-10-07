"""empty message

Revision ID: de0fc31e024e
Revises: f61912b39c68
Create Date: 2023-10-06 14:50:55.500564

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'de0fc31e024e'
down_revision = 'f61912b39c68'
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_email', sa.String(length=255), nullable=False))
        batch_op.create_unique_constraint('uq_email', ['_email'])  # Added constraint name 'uq_email'
        batch_op.drop_column('email')
    # ### end Alembic commands ###

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.VARCHAR(length=255), nullable=False))
        batch_op.drop_constraint('uq_email', type_='unique')  # Added constraint name 'uq_email' to drop
        batch_op.drop_column('_email')
    # ### end Alembic commands ###
