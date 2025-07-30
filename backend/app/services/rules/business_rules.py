def check_activation_before_close_date(record):
    """
    Checks if activation_date is before close_date.
    """
    if 'activation_date' in record and 'close_date' in record:
        if record['activation_date'] >= record['close_date']:
            return "Activation date must be before close date."
    return None

def check_enrollment_after_activation(record):
    """
    Checks if enrollment_date is on or after activation_date.
    """
    if 'enrollment_date' in record and 'activation_date' in record:
        if record['enrollment_date'] < record['activation_date']:
            return "Enrollment date must be on or after activation date."
    return None

def check_subject_status(record, allowed_statuses):
    """
    Checks if subject_status is in the list of allowed values.
    """
    if 'subject_status' in record:
        if record['subject_status'] not in allowed_statuses:
            return f"Invalid subject status: {record['subject_status']}"
    return None
