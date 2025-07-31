import yaml
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.dta import DTAConfiguration
from app.schemas.dta import DTAConfigurationCreate, DTAConfigurationUpdate

def validate_dta_schema(config: dict):
    required_fields = ["source_system", "target_system", "field_mappings"]
    for field in required_fields:
        if field not in config:
            raise HTTPException(status_code=400, detail=f"Missing required field: {field}")

def create_dta_configuration(db: Session, config_in: DTAConfigurationCreate):
    validate_dta_schema(config_in.configuration)
    db_config = DTAConfiguration(name=config_in.name, configuration=config_in.configuration)
    db.add(db_config)
    db.commit()
    db.refresh(db_config)
    return db_config

def get_dta_configuration(db: Session, config_id: int):
    return db.query(DTAConfiguration).filter(DTAConfiguration.id == config_id).first()

def update_dta_configuration(db: Session, config_id: int, config_in: DTAConfigurationUpdate):
    db_config = get_dta_configuration(db, config_id)
    if not db_config:
        raise HTTPException(status_code=404, detail="DTA Configuration not found")

    update_data = config_in.dict(exclude_unset=True)
    if "configuration" in update_data:
        validate_dta_schema(update_data["configuration"])

    for field, value in update_data.items():
        setattr(db_config, field, value)

    db.add(db_config)
    db.commit()
    db.refresh(db_config)
    return db_config
