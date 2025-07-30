from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from app.models.dta import StatusEnum

# DTAConfiguration Schemas
class DTAConfigurationBase(BaseModel):
    name: str
    configuration: Dict[str, Any]

class DTAConfigurationCreate(DTAConfigurationBase):
    pass

class DTAConfiguration(DTAConfigurationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# DataUpload Schemas
class DataUploadBase(BaseModel):
    filename: str

class DataUploadCreate(DataUploadBase):
    pass

class DataUpload(DataUploadBase):
    id: int
    filepath: str
    status: StatusEnum
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# TransformationJob Schemas
class TransformationJobBase(BaseModel):
    dta_configuration_id: int
    data_upload_id: int

class TransformationJobCreate(TransformationJobBase):
    pass

class TransformationJob(TransformationJobBase):
    id: int
    status: StatusEnum
    results: Optional[Dict[str, Any]]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# QualityCheck Schemas
class QualityCheckBase(BaseModel):
    job_id: int
    results: Dict[str, Any]

class QualityCheckCreate(QualityCheckBase):
    pass

class QualityCheck(QualityCheckBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# CTMSRecord Schemas
class CTMSRecordBase(BaseModel):
    job_id: int
    data: Dict[str, Any]

class CTMSRecordCreate(CTMSRecordBase):
    pass

class CTMSRecord(CTMSRecordBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
