def check_site_id_consistency(record, valid_site_ids):
    """
    Checks if the site_id is valid.
    """
    if 'site_id' in record:
        if record['site_id'] not in valid_site_ids:
            return f"Invalid site_id: {record['site_id']}"
    return None

def check_pi_assignment(record, valid_pi_assignments):
    """
    Checks if the PI is assigned to the site.
    """
    if 'site_id' in record and 'pi_name' in record:
        if record['site_id'] in valid_pi_assignments:
            if record['pi_name'] not in valid_pi_assignments[record['site_id']]:
                return f"PI {record['pi_name']} is not assigned to site {record['site_id']}"
        else:
            return f"Site {record['site_id']} not found in PI assignments"
    return None

def check_study_protocol_compliance(record, protocol_rules):
    """
    Checks if the record complies with the study protocol.
    """
    # This is a placeholder for more complex protocol compliance logic
    return None
