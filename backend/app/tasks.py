from celery import Celery

celery_app = Celery("tasks", broker="redis://localhost:6379/0", backend="redis://localhost:6379/0")

@celery_app.task
def analyze_data_quality_task(upload_id: int):
    # Placeholder for the quality analysis task
    return {"upload_id": upload_id, "status": "completed"}

@celery_app.task
def transform_data_task(upload_id: int):
    # Placeholder for the transformation task
    return {"upload_id": upload_id, "status": "completed"}
