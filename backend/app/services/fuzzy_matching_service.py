from rapidfuzz import process, fuzz

class FuzzyMatchingService:
    def _get_scorer(self, scorer_name: str):
        if scorer_name == 'Levenshtein':
            return fuzz.ratio
        elif scorer_name == 'Jaro-Winkler':
            return fuzz.jaro_winkler_similarity
        else:
            return fuzz.WRatio

    def find_best_match(self, query: str, choices: list, scorer='WRatio', score_cutoff=80):
        scorer_func = self._get_scorer(scorer)
        return process.extractOne(query, choices, scorer=scorer_func, score_cutoff=score_cutoff)

    def batch_match_entities(self, queries: list, choices: list, scorer='WRatio', score_cutoff=80):
        scorer_func = self._get_scorer(scorer)
        return [process.extractOne(q, choices, scorer=scorer_func, score_cutoff=score_cutoff) for q in queries]

    def create_match_confidence_report(self, matches: list):
        report = []
        for match in matches:
            if match:
                query, choice, score = match
                report.append({"query": query, "match": choice, "confidence": score})
        return report

    def build_entity_cross_reference(self, matches: list):
        cross_reference = {}
        for match in matches:
            if match:
                query, choice, score = match
                cross_reference[query] = choice
        return cross_reference

fuzzy_matching_service = FuzzyMatchingService()
