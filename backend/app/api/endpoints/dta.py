from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import yaml

from app import schemas
from app.services import dta_service
from app.api import deps

router = APIRouter()

@router.post("/upload", response_model=schemas.DTAConfiguration)
def upload_dta(
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
):
    """
    Upload and validate a YAML DTA configuration.
    """
    try:
        content = file.file.read()
        config_data = yaml.safe_load(content)
    except yaml.YAMLError as e:
        raise HTTPException(status_code=400, detail=f"Invalid YAML file: {e}")

    config_in = schemas.DTAConfigurationCreate(name=file.filename, configuration=config_data)
    return dta_service.create_dta_configuration(db=db, config_in=config_in)

@router.get("/{id}", response_model=schemas.DTAConfiguration)
def get_dta(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
):
    """
    Retrieve a DTA configuration by ID.
    """
    config = dta_service.get_dta_configuration(db=db, config_id=id)
    if not config:
        raise HTTPException(status_code=404, detail="DTA Configuration not found")
    return config

@router.put("/{id}", response_model=schemas.DTAConfiguration)
def update_dta(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    config_in: schemas.DTAConfigurationUpdate,
):
    """
    Update a DTA configuration.
    """
    return dta_service.update_dta_configuration(db=db, config_id=id, config_in=config_in)

@router.post("/{id}/validate")
def validate_dta(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
):
    """
    Validate a DTA configuration against a schema.
    """
    config = dta_service.get_dta_configuration(db=db, config_id=id)
    if not config:
        raise HTTPException(status_code=404, detail="DTA Configuration not found")

    try:
        dta_service.validate_dta_schema(config.configuration)
    except HTTPException as e:
        return {"valid": False, "errors": e.detail}

    return {"valid": True, "errors": []}
