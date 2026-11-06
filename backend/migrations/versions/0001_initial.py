"""Initial Atlas relational schema and pgvector extension."""
from alembic import op
import sqlalchemy as sa
from pgvector.sqlalchemy import Vector

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.execute("CREATE EXTENSION IF NOT EXISTS vector")
    op.create_table("roles", sa.Column("id", sa.Integer, primary_key=True), sa.Column("name", sa.String(40), nullable=False, unique=True))
    op.create_table("users", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("email", sa.String(320), nullable=False, unique=True), sa.Column("password_hash", sa.String(255), nullable=False), sa.Column("display_name", sa.String(160), nullable=False), sa.Column("is_active", sa.Boolean, nullable=False, server_default=sa.true()), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()))
    op.create_table("user_roles", sa.Column("user_id", sa.Uuid, sa.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True), sa.Column("role_id", sa.Integer, sa.ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True))
    op.create_table("collections", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("name", sa.String(200), nullable=False), sa.Column("description", sa.Text), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()))
    op.create_table("documents", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("name", sa.String(512), nullable=False), sa.Column("content_type", sa.String(120), nullable=False), sa.Column("size_bytes", sa.BigInteger, nullable=False), sa.Column("storage_key", sa.String(1024), nullable=False, unique=True), sa.Column("status", sa.String(20), nullable=False), sa.Column("uploaded_by", sa.Uuid, sa.ForeignKey("users.id")), sa.Column("collection_id", sa.Uuid, sa.ForeignKey("collections.id", ondelete="SET NULL")), sa.Column("processing_error", sa.Text), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()), sa.CheckConstraint("status IN ('UPLOADED','PROCESSING','READY','FAILED','DELETING')", name="ck_documents_status"))
    op.create_table("document_permissions", sa.Column("document_id", sa.Uuid, sa.ForeignKey("documents.id", ondelete="CASCADE"), primary_key=True), sa.Column("user_id", sa.Uuid, sa.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True), sa.Column("permission", sa.String(20), nullable=False, server_default="read"))
    op.create_table("document_chunks", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("document_id", sa.Uuid, sa.ForeignKey("documents.id", ondelete="CASCADE"), nullable=False), sa.Column("chunk_index", sa.Integer, nullable=False), sa.Column("text", sa.Text, nullable=False), sa.Column("embedding", Vector(1536)), sa.Column("page_number", sa.Integer), sa.Column("section_heading", sa.String(512)), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()), sa.UniqueConstraint("document_id", "chunk_index", name="uq_chunk_document_index"))
    op.create_table("conversations", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("user_id", sa.Uuid, sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False), sa.Column("title", sa.String(300), nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()), sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()))
    op.create_table("messages", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("conversation_id", sa.Uuid, sa.ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False), sa.Column("role", sa.String(20), nullable=False), sa.Column("content", sa.Text, nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()), sa.CheckConstraint("role IN ('user','assistant','system')", name="ck_messages_role"))
    op.create_table("message_citations", sa.Column("message_id", sa.Uuid, sa.ForeignKey("messages.id", ondelete="CASCADE"), primary_key=True), sa.Column("chunk_id", sa.Uuid, sa.ForeignKey("document_chunks.id", ondelete="CASCADE"), primary_key=True), sa.Column("excerpt", sa.Text, nullable=False))
    op.create_table("feedback", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("message_id", sa.Uuid, sa.ForeignKey("messages.id", ondelete="CASCADE"), nullable=False), sa.Column("user_id", sa.Uuid, sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False), sa.Column("rating", sa.Integer, nullable=False), sa.Column("comment", sa.Text), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()), sa.CheckConstraint("rating IN (-1,1)", name="ck_feedback_rating"))
    op.create_table("ingestion_jobs", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("document_id", sa.Uuid, sa.ForeignKey("documents.id", ondelete="CASCADE"), nullable=False), sa.Column("status", sa.String(20), nullable=False), sa.Column("attempts", sa.Integer, nullable=False, server_default="0"), sa.Column("error", sa.Text), sa.Column("started_at", sa.DateTime(timezone=True)), sa.Column("finished_at", sa.DateTime(timezone=True)))
    op.create_table("evaluation_runs", sa.Column("id", sa.Uuid, primary_key=True), sa.Column("config", sa.JSON, nullable=False), sa.Column("metrics", sa.JSON, nullable=False), sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()))
    op.execute("INSERT INTO roles (name) VALUES ('employee'), ('knowledge_admin'), ('system_admin')")

def downgrade():
    for table in ("evaluation_runs", "ingestion_jobs", "feedback", "message_citations", "messages", "conversations", "document_chunks", "document_permissions", "documents", "collections", "user_roles", "users", "roles"):
        op.drop_table(table)
