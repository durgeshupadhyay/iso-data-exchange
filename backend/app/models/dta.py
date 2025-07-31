import enum
from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Enum,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base


class StatusEnum(str, enum.Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    failed = "failed"


class DTAConfiguration(Base):
    __tablename__ = "dta_configurations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True, nullable=False)
    configuration = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    jobs = relationship("TransformationJob", back_populates="dta_configuration")


class DataUpload(Base):
    __tablename__ = "data_uploads"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    job = relationship("TransformationJob", back_populates="data_upload", uselist=False)


class TransformationJob(Base):
    __tablename__ = "transformation_jobs"

    id = Column(Integer, primary_key=True, index=True)
    dta_configuration_id = Column(Integer, ForeignKey("dta_configurations.id"), nullable=False)
    data_upload_id = Column(Integer, ForeignKey("data_uploads.id"), nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending, nullable=False)
    results = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    dta_configuration = relationship("DTAConfiguration", back_populates="jobs")
    data_upload = relationship("DataUpload", back_populates="job")
    quality_checks = relationship("QualityCheck", back_populates="job")
    ctms_records = relationship("CTMSRecord", back_populates="job")


class QualityCheck(Base):
    __tablename__ = "quality_checks"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("transformation_jobs.id"), nullable=False)
    results = Column(JSONB)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    job = relationship("TransformationJob", back_populates="quality_checks")


class CTMSRecord(Base):
    __tablename__ = "ctms_records"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("transformation_jobs.id"), nullable=False)
    data = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    job = relationship("TransformationJob", back_populates="ctms_records")
