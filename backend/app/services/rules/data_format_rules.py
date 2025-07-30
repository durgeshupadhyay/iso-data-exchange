from datetime import datetime

def check_required_field(record, field):
    """
    Checks if a required field is present.
    """
    if field not in record or record[field] is None:
        return f"Missing required field: {field}"
    return None

def check_date_format(record, field, date_format="%Y-%m-%d"):
    """
    Checks if a date field has the correct format.
    """
    if field in record and record[field] is not None:
        try:
            datetime.strptime(str(record[field]), date_format)
        except ValueError:
            return f"Invalid date format for field {field}: {record[field]}"
    return None

def check_data_type(record, field, expected_type):
    """
    Checks if a field has the correct data type.
    """
    if field in record and record[field] is not None:
        if not isinstance(record[field], expected_type):
            return f"Invalid data type for field {field}: expected {expected_type.__name__}, got {type(record[field]).__name__}"
    return None

def check_range(record, field, min_value=None, max_value=None):
    """
    Checks if a numeric field is within a specified range.
    """
    if field in record and record[field] is not None:
        if min_value is not None and record[field] < min_value:
            return f"Value for field {field} is below the minimum of {min_value}"
        if max_value is not None and record[field] > max_value:
            return f"Value for field {field} is above the maximum of {max_value}"
    return None
